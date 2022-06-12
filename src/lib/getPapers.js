import { notion } from "@services/notion";

import { getNordColor } from "@utils/getNordColor";
import { getPaperCoverImage } from "./getPaperCoverImage";

export async function getPapers() {
	const PAPERS_DATABASE_ID = process.env.NOTION_PAPERS_DATABASE_ID;

	const response = await notion.databases.query({
		database_id: PAPERS_DATABASE_ID,
		filter: {
			property: "Status",
			select: {
				equals: "Published",
			},
		},
		sorts: [
			{
				property: "Created at",
				direction: "descending",
			},
		],
	});

	const papers = {
		featured: [],
		latest: [],
	};

	for (const page of response.results) {
		const isFeatured = page.properties.Featured.checkbox;

		if (isFeatured) {
			const paper = await buildPaperFromPage(page);
			papers.featured.push(paper);
		} else {
			const paper = await buildPaperFromPage(page);
			papers.latest.push(paper);
		}

		async function buildPaperFromPage(page) {
			const { id, created_time, properties } = page;
			const image = await getPaperCoverImage(page);

			return {
				id,
				image,
				createdAt: created_time,
				title: properties.Name.title,
				slug: properties.Slug.formula.string,
				description: properties.Description.rich_text,
				tags: properties.Tags.multi_select.map(option => ({
					id: option.id,
					name: option.name,
					color: getNordColor(option.color),
				})),
				language: properties.Language ? properties.Language.select.name : null,
				notionUrl: page.url,
			};
		}
	}

	return papers;
}
