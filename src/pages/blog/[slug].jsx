import { notion } from "../../services/notion";

import { getNordColor } from "../../utils/getNordColor";
import { getPostCoverImage } from "../../utils/getPostCoverImage";

export default function BlogPost({ post }) {
	console.dir(post, { depth: null });

	return <h1>Blog post</h1>;
}

const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

export async function getStaticPaths() {
	const response = await notion.databases.query({
		database_id: blogDatabaseId,
		filter: {
			property: "Status",
			select: {
				equals: "Published",
			},
		},
	});

	const paths = response.results.map(page => {
		const postSlug = page.properties["Slug"].formula.string;

		return {
			params: { slug: postSlug },
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const dataResponse = await notion.databases.query({
		database_id: blogDatabaseId,
		filter: {
			and: [
				{
					property: "Status",
					select: {
						equals: "Published",
					},
				},
				{
					property: "Slug",
					formula: {
						text: { contains: slug },
					},
				},
			],
		},
		page_size: 1,
	});

	const notionPost = dataResponse.results[0];
  const postImage = await getPostCoverImage(notionPost);

	const post = {
		id: notionPost.id,
		image: postImage,
		createdAt: notionPost.created_time,
		title: notionPost.properties["Name"].title,
		description: notionPost.properties["Description"].rich_text,
		tags: notionPost.properties["Tags"].multi_select.map(option => ({
			id: option.id,
			name: option.name,
			color: getNordColor(option.color),
		})),
		language: notionPost.properties.Language
			? notionPost.properties.Language.select.name
			: null,
		notionUrl: notionPost.url,
	};

  const pageResponse = await notion.blocks.children.list({
    block_id: post.id
  });

  post.content = pageResponse.results;

	return {
		props: { post },
	};
}
