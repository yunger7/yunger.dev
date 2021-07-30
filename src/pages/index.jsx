import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {
	Container,
	Grid,
	Card,
	CardContent,
	Typography,
	Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
	ShoppingCart as ShoppingCartIcon,
	LiveTv as LiveTvIcon,
	Description as DescriptionIcon,
	KeyboardArrowRight as KeyboardArrowRightIcon,
	Info as InfoIcon,
	Book as BookIcon,
	ContactMail as ContactMailIcon,
} from "@material-ui/icons";

import Carousel from "react-material-ui-carousel";
import { getPlaiceholder } from "plaiceholder";

import { notion } from "../services/notion";
import { getNordColor } from "../utils/getNordColor";
import { nordPalette } from "../theme";

import { Header } from "../components/Header";
import { SquareLink } from "../components/SquareLink";
import { FeaturedBlog } from "../components/FeaturedBlog";
import { BlogPost } from "../components/BlogPost";
import { Footer } from "../components/Footer";
import { WaveDivider1 } from "../components/dividers/WaveDivider1";
import { WaveDivider3 } from "../components/dividers/WaveDivider3";
import { WaveDivider4 } from "../components/dividers/WaveDivider4";
import { WaveDivider5 } from "../components/dividers/WaveDivider5";

import nordicWallpaper from "../../public/nordic-wallpaper.jpg";
import profilePicture from "../../public/profile-picture.jpg";

const useStyles = makeStyles(theme => ({
	page: {
		paddingTop: theme.spacing(6),
	},
	sectionTitle: {
		marginBottom: theme.spacing(2),
	},
	introduction: {
		paddingBottom: theme.spacing(5),
		[theme.breakpoints.down("sm")]: {
			paddingBottom: theme.spacing(10),
		},
	},
	introductionCard: {
		width: "100%",
	},
	introductionWallpaper: {
		width: "100%",
		height: 250,
		position: "relative",
	},
	introductionCardContent: {
		padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
	},
	profile: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			alignItems: "center",
			textAlign: "center",
			marginBottom: theme.spacing(2),
		},
	},
	profileName: {
		display: "flex",
		flexDirection: "column",
	},
	profileImage: {
		position: "relative",
		bottom: 100,
		maxHeight: 100,
		marginRight: theme.spacing(2.5),
		"& img": {
			borderRadius: theme.shape.borderRadius,
		},
		[theme.breakpoints.down("sm")]: {
			marginRight: 0,
		},
	},
	projects: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(10),
		backgroundColor: "#292e39",
		[theme.breakpoints.down("sm")]: {
			paddingTop: theme.spacing(5),
		},
	},
	squareLink: {
		width: 200,
		height: 200,
	},
	posts: {
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.down("sm")]: {
			paddingTop: theme.spacing(5),
		},
	},
	latestPosts: {
		marginTop: theme.spacing(5),
	},
	more: {
		backgroundColor: "#292e39",
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.down("sm")]: {
			paddingTop: theme.spacing(5),
		},
	},
}));

const carouselProps = {
	navButtonsAlwaysInvisible: true,
	indicatorIconButtonProps: {
		style: {
			color: nordPalette.nord1,
			"&:hover": {
				backgroundColor: nordPalette.nord1,
			},
			"&:active": {
				backgroundColor: nordPalette.nord1,
			},
		},
	},
	activeIndicatorIconButtonProps: {
		style: {
			color: nordPalette.nord9,
		},
	},
};

export default function Home({ posts }) {
	const classes = useStyles();

	return (
		<>
			<Head>
				<title>yunger.dev</title>
			</Head>
			<Header />
			<main className={classes.page}>
				<section className={classes.introduction}>
					<Container maxWidth="lg">
						<Card className={classes.introductionCard}>
							<div className={classes.introductionWallpaper}>
								<Image
									src={nordicWallpaper}
									alt="Snow mountain wallpaper"
									layout="fill"
									placeholder="blur"
									objectFit="cover"
								/>
							</div>
							<CardContent className={classes.introductionCardContent}>
								<div className={classes.profile}>
									<div className={classes.profileImage}>
										<Image
											src={profilePicture}
											alt="yunger profile image"
											width={175}
											height={175}
											priority
										/>
									</div>
									<div className={classes.profileName}>
										<Typography variant="h3">Luís Galete</Typography>
										<Typography variant="subtitle1">yunger</Typography>
									</div>
								</div>
								<div>
									<Typography variant="body1">
										Hello world 👋 <br /> I&apos;m <strong>Luís</strong>, a
										programmer, musician and coffee enthusiast. I taught myself how
										to code to turn my dumb ideas into reality, and I&apos;ve
										created this place to share them with the world.
									</Typography>
								</div>
							</CardContent>
						</Card>
					</Container>
				</section>

				<WaveDivider1 color="#292e39" />

				<section className={classes.projects}>
					<Container maxWidth="lg">
						<div className={classes.sectionTitle}>
							<Typography variant="h4" component="h2">
								Projects
							</Typography>
							<Divider />
						</div>
						<Grid container justifyContent="space-between" spacing={4}>
							<Grid item md={3} sm={6} xs={12} className={classes.squareLink}>
								<Link href="/shop" passHref>
									<SquareLink icon={ShoppingCartIcon}>Shop</SquareLink>
								</Link>
							</Grid>
							<Grid item md={3} sm={6} xs={12} className={classes.squareLink}>
								<Link href="/blog" passHref>
									<SquareLink icon={DescriptionIcon}>Blog</SquareLink>
								</Link>
							</Grid>
							<Grid item md={3} sm={6} xs={12} className={classes.squareLink}>
								<Link href="/animelist" passHref>
									<SquareLink icon={LiveTvIcon}>Animelist</SquareLink>
								</Link>
							</Grid>
							<Grid item md={3} sm={6} xs={12} className={classes.squareLink}>
								<Link href="/projects" passHref>
									<SquareLink icon={KeyboardArrowRightIcon}>
										More projects
									</SquareLink>
								</Link>
							</Grid>
						</Grid>
					</Container>
				</section>

				<WaveDivider5 backgroundColor="#292e39" color="#242933" />

				<section className={classes.posts}>
					<Container maxWidth="lg">
						<div className={classes.sectionTitle}>
							<Typography variant="h4" component="h2">
								Blog posts
							</Typography>
							<Divider />
						</div>
						{!!posts.featured.length && (
							<Carousel {...carouselProps}>
								{posts.featured.map(post => (
									<FeaturedBlog key={post.id} post={post} />
								))}
							</Carousel>
						)}
						<div className={classes.latestPosts}>
							<Grid container spacing={4}>
								{posts.latest.map(post => (
									<Grid item md={4} sm={6} xs={12} key={post.id}>
										<BlogPost post={post} />
									</Grid>
								))}
							</Grid>
						</div>
					</Container>
				</section>
				
				<WaveDivider3 color="#292e39" />

				<section className={classes.more}>
					<Container maxWidth="lg">
						<div className={classes.sectionTitle}>
							<Typography variant="h4" component="h2">
								More
							</Typography>
							<Divider />
						</div>
						<Grid container justifyContent="space-between" spacing={4}>
							<Grid item sm={4} xs={12} className={classes.squareLink}>
								<Link href="/about" passHref>
									<SquareLink icon={InfoIcon}>About me</SquareLink>
								</Link>
							</Grid>
							<Grid item sm={4} xs={12} className={classes.squareLink}>
								<Link href="/notes" passHref>
									<SquareLink icon={BookIcon}>Random notes</SquareLink>
								</Link>
							</Grid>
							<Grid item sm={4} xs={12} className={classes.squareLink}>
								<Link href="/contact" passHref>
									<SquareLink icon={ContactMailIcon}>Contact me</SquareLink>
								</Link>
							</Grid>
						</Grid>
					</Container>
				</section>
			</main>

			<WaveDivider4 backgroundColor="#292e39" />

			<Footer />
		</>
	);
}

export async function getStaticProps() {
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
			const image = await getCoverImage(page);

			return {
				id,
				image,
				createdAt: created_time,
				title: properties.Name.title,
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

		// Temporarily hosting images on Imgur since Notion's API doesn't support files yet.
		async function getCoverImage(page) {
			const files = page.properties["Cover Image"].files;

			if (files.length) {
				const { base64, img } = await getPlaiceholder(files[0].name);
	
				return {
					...img,
					blurDataURL: base64,
				};
			}

			return null;
		}
	}

	return {
		props: {
			posts,
		},
	};
}
