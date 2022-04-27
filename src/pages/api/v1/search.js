import { getNotionAPIError } from "../../../lib/getNotionAPIError";
import { notion } from "../../../services/notion";
import { getPlainTextFromRichText } from "../../../utils/getPlainText";

const PAGES_DATABASE_ID = process.env.NOTION_PAGES_DATABASE_ID;
const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;

export default async function handler(request, response) {
	console.log(`[${request.method}]: api/v1/search`);

	try {
		await verifyRequest(request, response);
		const results = await searchNotionAPI(request.body.query);
		const filteredResults = await filterResults(results);
		const formattedData = await formatData(filteredResults);

		const apiResponse = {
			message: "Database retrieved successfully",
			success: true,
			code: "ok",
			status: 200,
		};

		console.log({ ...apiResponse, data: formattedData });

		return response
			.status(apiResponse.status)
			.json({ ...apiResponse, data: formattedData });
	} catch (error) {
		console.log(error);
		return response.status(error.status).json(error);
	}
}

async function verifyRequest(request, response) {
	try {
		if (request.method !== "POST") {
			response.setHeader("Allow", ["POST"]);

			throw {
				message: `Method ${request.method} is not allowed`,
				success: false,
				code: "method_not_allowed",
				status: 405,
			};
		}

		if (!Object.keys(request.body).length) {
			throw {
				message: "Request is missing body",
				success: false,
				code: "validation_error",
				status: 400,
			};
		}

		if (!request.body.query) {
			throw {
				message: "Missing 'query' value in body",
				success: false,
				code: "validation_error",
				status: 400,
			};
		}
	} catch (error) {
		throw error;
	}
}

async function searchNotionAPI(query) {
	try {
		const { results } = await notion.search({
			query,
			sort: {
				direction: "ascending",
				timestamp: "last_edited_time",
			},
		});

		return results;
	} catch (error) {
		throw getNotionAPIError(error);
	}
}

async function filterResults(results) {
	try {
		const filteredResults = [];

		for (const page of results) {
			if (page.parent.type !== "database_id") {
				continue;
			}

			const parentDatabaseId = page.parent.database_id.replace(/[-]/g, "");
			const acceptedParentIds = [PAGES_DATABASE_ID, BLOG_DATABASE_ID];

			if (!acceptedParentIds.includes(parentDatabaseId)) {
				continue;
			}

			if (
				parentDatabaseId === PAGES_DATABASE_ID &&
				!page.properties["Public"]?.checkbox
			) {
				continue;
			}

			if (
				parentDatabaseId === BLOG_DATABASE_ID &&
				page.properties["Status"]?.select?.name !== "Published"
			) {
				continue;
			}

			filteredResults.push(page);
		}

		return filteredResults;
	} catch (error) {
		throw {
			message: "Failed to filter results",
			success: false,
			code: "internal_server_error",
			status: 500,
		};
	}
}

async function formatData(results) {
	try {
		const data = [];

		for (const page of results) {
			const { id, properties } = page;

			// Get title
			const titleKey = Object.keys(properties).find(
				key => properties[key].type === "title"
			);
			const title = getPlainTextFromRichText(properties[titleKey].title);
			let href = "";
			let pageType = "";

			// Get href and page type (webpage, post, etc.)
			if (page.parent.database_id.replace(/[-]/g, "") === PAGES_DATABASE_ID) {
				href = getPlainTextFromRichText(page.properties["Href"].rich_text);
				pageType = "webpage";
			}

			if (page.parent.database_id.replace(/[-]/g, "") === BLOG_DATABASE_ID) {
				href = `/blog/${page.properties["Slug"].formula.string}`;
				pageType = "post";
			}

			data.push({
				id,
				title,
				href,
				pageType,
			});
		}

		return data;
	} catch (error) {
		throw {
			message: "Failed to format data",
			success: false,
			code: "internal_server_error",
			status: 500,
		};
	}
}
