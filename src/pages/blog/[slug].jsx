import Head from "next/head";
import Image from "next/image";

import readingTime from "reading-time";

import { Box, Stack, Container, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useBlockRenderer } from "@hooks/useBlockRenderer";
import { getNotionPageContent } from "@lib/getNotionPageContent";
import { getPostCoverImage } from "@lib/getPostCoverImage";
import { notion } from "@services/notion";
import {
	getNordColor,
	getPlainTextFromBlocks,
	getPlainTextFromRichText,
} from "@utils";
import { Navbar, Header, RichText, Footer } from "@components";

import placeholder3 from "../../../public/placeholder3.jpg";

export default function BlogPost({ post }) {
	const {
		title,
		titleAsPlainText,
		description,
		image,
		icon,
		slug,
		tags,
		createdAt,
		content,
		readingTime,
	} = post;

	const theme = useTheme();
	const jsxContent = useBlockRenderer(content);

	const navbarPaths = [
		{
			name: "yunger.dev",
			href: "/",
		},
		{
			name: "Blog",
			href: "/blog",
		},
		{
			name: titleAsPlainText,
			href: slug,
		},
	];

	return (
		<>
			<Head>
				<title>{titleAsPlainText}</title>
			</Head>

			<Navbar paths={navbarPaths} />

			<Header
				backgroundImage={
					image ? (
						<Image
							priority
							src={image.src}
							alt="Post cover"
							layout="fill"
							objectFit="cover"
							placeholder="blur"
							blurDataURL={image.blurDataURL}
						/>
					) : (
						<Image
							priority
							src={placeholder3}
							alt="Post cover"
							layout="fill"
							objectFit="cover"
							placeholder="blur"
						/>
					)
				}
				dividerColor={theme.palette.background.paper}
			>
				{icon && (
					<Box component="span" sx={{ mb: 1 }}>
						<Image
							priority
							src={icon.external.url}
							alt="Post icon"
							width={100}
							height={100}
							objectFit="contain"
						/>
					</Box>
				)}
				<Typography component="h1" variant="h5">
					<RichText text={title} />
				</Typography>
				<Typography variant="body1">
					<RichText text={description} />
				</Typography>
				<Stack direction="row" spacing={1} sx={{ my: 1.5 }}>
					{tags.map(({ id, name, color }) => (
						<Chip size="small" label={name} key={id} sx={{ bgcolor: color }} />
					))}
				</Stack>
				<Typography
					gutterBottom
					variant="subtitle2"
					align="center"
					sx={{ fontWeight: 400 }}
				>
					{new Date(createdAt).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}{" "}
					• {readingTime.text}
				</Typography>
			</Header>

			<Box component="main">
				<Box
					component="section"
					sx={{
						pt: 2.5,
						pb: 10,
						bgcolor: theme => theme.palette.background.paper,
					}}
				>
					<Container maxWidth="md">{jsxContent}</Container>
				</Box>
			</Box>
			<Footer />
		</>
	);
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
	const blogContent = await getNotionPageContent(notionPost.id);
	const blogContentRaw = getPlainTextFromBlocks(blogContent);

	const post = {
		id: notionPost.id,
		image: postImage,
		icon: notionPost.icon,
		createdAt: notionPost.created_time,
		readingTime: readingTime(blogContentRaw),
		title: notionPost.properties["Name"].title,
		titleAsPlainText: getPlainTextFromRichText(
			notionPost.properties["Name"].title
		),
		content: blogContent,
		slug: notionPost.properties.Slug.formula.string,
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

	return {
		props: {
			post,
		},
		revalidate: 60 * 60 * 8, // 8 hours
	};
}
