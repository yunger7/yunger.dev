import { notion } from "../services/notion";

import { getNordColor } from "../utils/getNordColor";
import { getPostCoverImage } from "../utils/getPostCoverImage";

export async function getBlogPosts() {
	const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

	const response = await notion.databases.query({
		database_id: blogDatabaseId,
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

	const posts = {
		featured: [],
		latest: [],
	};

	for (const page of response.results) {
		const isFeatured = page.properties.Featured.checkbox;

		if (isFeatured) {
			const post = await buildPostFromPage(page);
			posts.featured.push(post);
		} else {
			const post = await buildPostFromPage(page);
			posts.latest.push(post);
		}

		async function buildPostFromPage(page) {
			const { id, created_time, properties } = page;
			const image = await getPostCoverImage(page);

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

	return posts;
}
