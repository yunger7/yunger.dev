import Head from "next/head";
import Image from "next/image";

import {
	Container,
	Card,
	CardContent,
	Typography,
	Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { notion } from "../../services/notion";

import { getNordColor } from "../../utils/getNordColor";
import { getPostCoverImage } from "../../utils/getPostCoverImage";
import { getPlainTextFromBlocks } from "../../utils/getPlainTextFromBlocks";

import { Header } from "../../components/Header";
import { RichText } from "../../components/RichText";

import placeholder3 from "../../../public/placeholder3.jpg";

const useStyles = makeStyles(theme => ({
	page: {
		paddingTop: theme.spacing(6),
	},
	blogImage: {
		width: "100%",
		height: 250,
		position: "relative",
	},
	tags: {
		margin: `${theme.spacing(1.5)}px 0`,

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	tag: {
		margin: `0 ${theme.spacing(0.5)}px`,
	},
	date: {
		fontWeight: 400,
	},
}));

export default function BlogPost({ post }) {
	const classes = useStyles();
	const { title, image, slug, tags, createdAt } = post;
	const titleAsPlainText = getPlainTextFromBlocks(title);

	console.dir(post, { depth: null });

	const headerPaths = [
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
			<Header paths={headerPaths} />
			<main className={classes.page}>
				<section>
					<Container maxWidth="lg">
						<Card>
							<div className={classes.blogImage}>
								{image ? (
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
								)}
							</div>
							<CardContent>
								<Typography component="h1" variant="h5" align="center">
									<RichText text={title} />
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
									})}
								</Typography>
							</CardContent>
						</Card>
					</Container>
				</section>
			</main>
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

	const post = {
		id: notionPost.id,
		image: postImage,
		createdAt: notionPost.created_time,
		title: notionPost.properties["Name"].title,
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

	const pageResponse = await notion.blocks.children.list({
		block_id: post.id,
	});

	post.content = pageResponse.results;

	return {
		props: { post },
	};
}
