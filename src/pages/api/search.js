import { notion } from "../../services/notion";
import { getPlainTextFromRichText } from "../../utils/getPlainText";

const pagesDatabaseId = process.env.NOTION_PAGES_DATABASE_ID;
const messageDatabaseId = process.env.NOTION_MESSAGES_DATABASE_ID;
const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

export default async function search(request, response) {
	if (request.method !== "POST") {
		response.status(400).json({ message: "Only POST requests are allowed" });
		return;
	}

	const { query } = request.body;

	if (!query) {
		response.status(400).json({ error: true, message: "'query' is missing" });
		return;
	}

	try {
		const { results } = await notion.search({
			query,
			sort: {
				direction: "ascending",
				timestamp: "last_edited_time",
			},
		});

		const filteredData = filterResults(results);
		const data = getData(filteredData);

		response.status(200).json(data);
		return;
	} catch (error) {
		console.log(error);
		response
			.status(500)
			.json({ error: true, message: "Internal server error" });

		return;
	}
}

function filterResults(results) {
	const filteredResults = [];

	for (const page of results) {
		if (page.object === "database") {
			continue;
		}

		if (page.parent.database_id.replace(/[-]/g, "") === messageDatabaseId) {
			continue;
		}

		if (page.parent.database_id.replace(/[-]/g, "") === pagesDatabaseId) {
			if (!page.properties["Public"].checkbox) {
				continue;
			}
		}

		if (page.parent.database_id.replace(/[-]/g, "") === blogDatabaseId) {
			if (page.properties["Status"]?.select.name !== "Published") {
				continue;
			}
		}

		filteredResults.push(page);
	}

	return filteredResults;
}

function getData(results) {
	const data = [];

	for (const page of results) {
		const { id, properties } = page;

		// Get title
		const titleKey = Object.keys(properties).find(key => properties[key].type === "title");
		const title = getPlainTextFromRichText(properties[titleKey].title);
		let href = "";
		let pageType = ""

		// Get href and page type (webpage, post, etc.)
		if (page.parent.database_id.replace(/[-]/g, "") === pagesDatabaseId) {
			href = getPlainTextFromRichText(page.properties["Href"].rich_text);
			pageType = "webpage";
		}

		if (page.parent.database_id.replace(/[-]/g, "") === blogDatabaseId) {
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
}
