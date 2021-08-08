import Head from "next/head";
import Image from "next/image";

import {
	Container,
	Typography,
	Chip,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import readingTime from "reading-time";

import { notion } from "../../services/notion";

import { getNordColor } from "../../utils/getNordColor";
import { getPostCoverImage } from "../../utils/getPostCoverImage";
import {
	getPlainTextFromBlocks,
	getPlainTextFromRichText,
} from "../../utils/getPlainText";
import { useBlockRenderer } from "../../hooks/useBlockRenderer";
import { getNotionPageContent } from "../../lib/getNotionPageContent";

import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { RichText } from "../../components/RichText";
import { WaveDivider4 } from "../../components/dividers/WaveDivider4";
import { Footer } from "../../components/Footer";

import placeholder3 from "../../../public/placeholder3.jpg";

const useStyles = makeStyles(theme => ({
	tags: {
		margin: `${theme.spacing(1.5)}px 0`,

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	tag: {
		margin: `0 ${theme.spacing(0.5)}px`,
	},
	blogDate: {
		fontWeight: 400,
	},
	blogContent: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(10),
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function BlogPost({ post }) {
	const {
		title,
		titleAsPlainText,
		description,
		image,
		slug,
		tags,
		createdAt,
		content,
		readingTime,
	} = post;

	const classes = useStyles();
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
							src={image.src}
							alt="Post cover"
							layout="fill"
							objectFit="cover"
							placeholder="blur"
							blurDataURL={image.blurDataURL}
						/>
					) : (
						<Image
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
				<Typography component="h1" variant="h5">
					<RichText text={title} />
				</Typography>
				<Typography variant="body1">
					<RichText text={description} />
				</Typography>
				<div className={classes.tags}>
					{tags.map(({ id, name, color }) => (
						<Chip
							className={classes.tag}
							size="small"
							label={name}
							style={{ backgroundColor: color }}
							key={id}
						/>
					))}
				</div>
				<Typography
					className={classes.blogDate}
					variant="subtitle2"
					align="center"
					gutterBottom
				>
					{new Date(createdAt).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}{" "}
					• {readingTime.text}
				</Typography>
			</Header>

			<main className={classes.page}>
				<section className={classes.blogContent}>
					<Container maxWidth="md">{jsxContent}</Container>
				</section>
			</main>

			<WaveDivider4
				backgroundColor={theme.palette.background.paper}
				color="#242933"
			/>

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
