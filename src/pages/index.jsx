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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
	ShoppingCart as ShoppingCartIcon,
	LiveTv as LiveTvIcon,
	Description as DescriptionIcon,
	KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@material-ui/icons";

import { notion } from "../services/notion";
import { getNordColor } from "../utils/getNordColor";

import { Header } from "../components/Header";
import { SquareLink } from "../components/SquareLink";
import { BlogPost } from "../components/BlogPost";

import nordicWallpaper from "../../public/nordic-wallpaper.jpg";
import profilePicture from "../../public/profile-picture.jpg";

const useStyles = makeStyles(theme => ({
	page: {
		paddingTop: theme.spacing(6),
	},
	sectionTitle: {
		marginBottom: theme.spacing(2),
	},
	introductionCard: {
		width: "100%",
	},
	introductionCardContent: {
		padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
	},
	profile: {
		display: "flex",
		maxHeight: 100,
	},
	profileName: {
		display: "flex",
		flexDirection: "column",
	},
	profileImage: {
		position: "relative",
		bottom: 100,
		marginRight: theme.spacing(2.5),
		"& img": {
			borderRadius: theme.shape.borderRadius,
		},
	},
	projects: {
		marginTop: theme.spacing(5),
	},
	squareLink: {
		width: 200,
		height: 200,
	},
	posts: {
		marginTop: theme.spacing(5),
	},
	featuredPosts: {},
	latestPosts: {},
}));

export default function Home({ posts }) {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<>
			<Header />
			<Container className={classes.page} maxWidth="lg">
				<Card className={classes.introductionCard}>
					<Image
						src={nordicWallpaper}
						alt="Snow mountain wallpaper"
						width={theme.breakpoints.values.lg}
						height={300}
						placeholder="blur"
						objectFit="cover"
					/>
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

				<section className={classes.projects}>
					<div className={classes.sectionTitle}>
						<Typography variant="h4" component="h2">
							Projects
						</Typography>
						<Divider />
					</div>

					<Grid
						container
						justifyContent="space-between"
						spacing={4}
					>
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
				</section>

				<section className={classes.posts}>
					<div className={classes.sectionTitle}>
						<Typography variant="h4" component="h2">
							Blog posts
						</Typography>
						<Divider />
					</div>

					<div className={classes.featuredPosts}>

					</div>

					<div className={classes.latestPosts}>
						<Grid container spacing={4}>
							{posts.latest.map((post) => (
								<Grid item md={4} sm={6} xs={12} key={post.id}>
									<BlogPost post={post} />
								</Grid>
							))}
						</Grid>
					</div>
				</section>
			</Container>
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

	response.results.forEach(page => {
		const isFeatured = page.properties.Featured.checkbox;

		if (isFeatured) {
			const post = buildPostFromPage(page);
			posts.featured.push(post);
		} else {
			const post = buildPostFromPage(page);
			posts.latest.push(post);
		}

		function buildPostFromPage(page) {
			const { id, created_time, properties } = page;

			return {
				id,
				createdAt: created_time,
				title: properties.Name.title,
				description: properties.Description.rich_text,
				tags: properties.Tags.multi_select.map(option => ({
					id: option.id,
					name: option.name,
					color: getNordColor(option.color),
				})),
				language: properties.Language
					? properties.Language.select.name
					: null,
				// Temporarily hosting images on Imgur since Notion's API doesn't support files yet.
				coverImageUrl: properties["Cover Image"].files.length
					? properties["Cover Image"].files[0].name
					: null,
				notionUrl: page.url,
			};
		}
	});

	return {
		props: {
			posts,
		},
	};
}
