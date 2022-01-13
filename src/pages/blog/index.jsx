import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Container, Grid, Typography, Divider } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Description as DescriptionIcon } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";

import { getBlogPosts } from "../../lib/getBlogPosts";
import { palette } from "../../theme";

import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { FeaturedBlog } from "../../components/FeaturedBlog";
import { BlogPost } from "../../components/BlogPost";
import { WaveDivider1 } from "../../components/dividers/WaveDivider1";
import { WaveDivider4 } from "../../components/dividers/WaveDivider4";
import { Footer } from "../../components/Footer";

import nordicWallpaper from "../../../public/nordic-wallpaper.jpg";

const navbarPaths = [
	{
		name: "yunger.dev",
		href: "/",
	},
	{
		name: "Blog",
		href: "/blog",
	},
];

const carouselProps = {
	navButtonsAlwaysInvisible: true,
	indicatorIconButtonProps: {
		style: {
			color: palette.nord1,
			"&:hover": {
				backgroundColor: palette.nord1,
			},
			"&:active": {
				backgroundColor: palette.nord1,
			},
		},
	},
	activeIndicatorIconButtonProps: {
		style: {
			color: palette.nord9,
		},
	},
};

const useStyles = makeStyles(theme => ({
	sectionTitle: {
		marginBottom: theme.spacing(2),
	},
	scroll: {
		position: "relative",
		bottom: 100,
	},
	featured: {
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(5),
	},
	latest: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(10),
		backgroundColor: "#292e39",
	},
}));

export default function Blog({ posts }) {
	const classes = useStyles();

	return (
		<>
			<Head>
				<title>Blog | yunger.dev</title>
			</Head>

			<Navbar paths={navbarPaths} />

			<Header
				backgroundImage={
					<Image
						priority
						src={nordicWallpaper}
						alt="Nordic Wallpaper"
						layout="fill"
						placeholder="blur"
						objectFit="cover"
					/>
				}
				dividerColor="#242933"
			>
				<DescriptionIcon style={{ fontSize: 80 }} />
				<Typography variant="h3" component="h1">
					Blog posts
				</Typography>
			</Header>

			<main className={classes.page}>
				<section className={classes.featured}>
					<div id="featured" className={classes.scroll} />
					<Container maxWidth="lg">
						<div className={classes.sectionTitle}>
							<Typography variant="h4" component="h2">
								Featured
							</Typography>
							<Divider />
						</div>
						{!!posts.featured.length && (
							<Carousel {...carouselProps}>
								{posts.featured.map(post => (
									<Link href={`/blog/${post.slug}`} passHref key={post.id}>
										<FeaturedBlog post={post} />
									</Link>
								))}
							</Carousel>
						)}
					</Container>
				</section>

				<WaveDivider1 color="#292e39" />

				<section className={classes.latest}>
					<div id="latest" className={classes.scroll} />
					<Container maxWidth="lg">
						<div className={classes.sectionTitle}>
							<Typography variant="h4" component="h2">
								Latest
							</Typography>
							<Divider />
						</div>
						<Grid container spacing={4}>
							{posts.latest.map(post => (
								<Grid item md={4} sm={6} xs={12} key={post.id}>
									<Link href={`/blog/${post.slug}`} passHref>
										<BlogPost post={post} />
									</Link>
								</Grid>
							))}
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
	const posts = await getBlogPosts();

	return {
		props: {
			posts,
		},
		revalidate: 60 * 60 * 8, // 8 hours
	};
}
