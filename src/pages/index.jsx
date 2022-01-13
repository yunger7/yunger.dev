import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {
	Container,
	Grid,
	Typography,
	Divider,
	Link as MuiLink,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
	LocalCafe as CafeIcon,
	LiveTv as LiveTvIcon,
	Description as DescriptionIcon,
	KeyboardArrowRight as KeyboardArrowRightIcon,
	Info as InfoIcon,
	Book as BookIcon,
	ContactMail as ContactMailIcon,
} from "@mui/icons-material";

import Carousel from "react-material-ui-carousel";

import { palette } from "../theme";
import { getBlogPosts } from "../lib/getBlogPosts";

import { Navbar } from "../components/Navbar";
import { SquareLink } from "../components/SquareLink";
import { FeaturedBlog } from "../components/FeaturedBlog";
import { BlogPost } from "../components/BlogPost";
import { Footer } from "../components/Footer";
import { WaveDivider3 } from "../components/dividers/WaveDivider3";
import { WaveDivider4 } from "../components/dividers/WaveDivider4";
import { WaveDivider5 } from "../components/dividers/WaveDivider5";
import { Header } from "../components/Header";

import nordicWallpaper from "../../public/nordic-wallpaper.jpg";
import profilePicture from "../../public/profile-picture.jpg";

const useStyles = makeStyles(theme => ({
	sectionTitle: {
		marginBottom: theme.spacing(2),
	},
	scroll: {
		position: "relative",
		bottom: 100,
	},
	profileImage: {
		marginBottom: theme.spacing(1),

		"& img": {
			borderRadius: 10,
		},
	},
	bioLink: {
		"&:hover": {
			backgroundColor: "#ffffff00", // Remove hover color
		},
	},
	projects: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(10),
		backgroundColor: "#292e39",
		[theme.breakpoints.down("md")]: {
			paddingTop: theme.spacing(5),
		},
	},
	squareLink: {
		width: 200,
		height: 200,
	},
	posts: {
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.down("md")]: {
			paddingTop: theme.spacing(5),
		},
	},
	latestPosts: {
		marginTop: theme.spacing(5),
	},
	more: {
		backgroundColor: "#292e39",
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.down("md")]: {
			paddingTop: theme.spacing(5),
		},
	},
}));

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

export default function Home({ posts }) {
	const classes = useStyles();

	return (
		<>
			<Head>
				<title>yunger.dev</title>
			</Head>

			<Navbar />

			<Header
				backgroundImage={
					<Image
						className={classes.background}
						src={nordicWallpaper}
						alt="Nordic Wallpaper"
						layout="fill"
						placeholder="blur"
						objectFit="cover"
						priority
					/>
				}
			>
				<div className={classes.profileImage}>
					<Image
						priority
						src={profilePicture}
						alt="yunger profile image"
						width={150}
						height={150}
					/>
				</div>
				<Typography gutterBottom variant="h3" component="h1">
					yunger.dev
				</Typography>
				<Typography variant="body1">
					Hello world! I&apos;m <strong>Luís</strong>, a self-proclaimed digital
					craftsman, music enthusiast, anime connoisseur and coffee addict. I
					taught myself how to code to turn my dumb ideas into reality, and
					I&apos;ve created this place to share them with the world. Check out{" "}
					<Link href="/about" passHref>
						<MuiLink className={classes.bioLink}>my bio</MuiLink>
					</Link>{" "}
					for more information.
				</Typography>
			</Header>

			<main>
				<section className={classes.projects}>
					<div id="quick-access" className={classes.scroll} />
					<Container maxWidth="lg">
						<div className={classes.sectionTitle}>
							<Typography variant="h4" component="h2">
								Quick access
							</Typography>
							<Divider />
						</div>
						<Grid container justifyContent="space-between" spacing={4}>
							<Grid item md={3} sm={6} xs={12} className={classes.squareLink}>
								<Link href="/support" passHref>
									<SquareLink icon={CafeIcon} openInNewTab>
										Buy me a coffee
									</SquareLink>
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
										All projects
									</SquareLink>
								</Link>
							</Grid>
						</Grid>
					</Container>
				</section>

				<WaveDivider5 backgroundColor="#292e39" color="#242933" />

				<section className={classes.posts}>
					<div id="posts" className={classes.scroll} />
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
									<Link href={`/blog/${post.slug}`} passHref key={post.id}>
										<FeaturedBlog post={post} />
									</Link>
								))}
							</Carousel>
						)}
						<div className={classes.latestPosts}>
							<Grid container spacing={4}>
								{posts.latest.map(post => (
									<Grid item md={4} sm={6} xs={12} key={post.id}>
										<Link href={`/blog/${post.slug}`} passHref>
											<BlogPost post={post} />
										</Link>
									</Grid>
								))}
							</Grid>
						</div>
					</Container>
				</section>

				<WaveDivider3 color="#292e39" />

				<section className={classes.more}>
					<div id="more" className={classes.scroll} />
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
	const posts = await getBlogPosts();

	return {
		props: {
			posts,
		},
		revalidate: 60 * 60 * 8, // 8 hours
	};
}
