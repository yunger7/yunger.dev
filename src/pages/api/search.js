import { notion } from "../../services/notion";

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

		const data = filterResults(results);

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

const messageDatabaseId = process.env.NOTION_MESSAGES_DATABASE_ID;

function filterResults(results) {
	const filteredResults = [];

	for (const page of results) {
		if (page.object === "database") {
			continue;
		}

		if (page.parent.database_id === messageDatabaseId) {
			continue;
		}

		if (page.properties["Status"]?.select.name !== "Published") {
			continue;
		}

		filteredResults.push(page);
	}

	return filteredResults;
}
