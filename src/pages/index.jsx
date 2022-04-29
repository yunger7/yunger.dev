import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Carousel from "react-material-ui-carousel";

import {
	Box,
	Container,
	Grid,
	Typography,
	Divider,
	Link as MuiLink,
	useTheme,
	lighten,
} from "@mui/material";
import {
	LocalCafe as CafeIcon,
	Construction as ToolsIcon,
	Description as DescriptionIcon,
	Settings as ProjectsIcon,
	Info as InfoIcon,
	Book as BookIcon,
	ContactMail as ContactMailIcon,
} from "@mui/icons-material";

import { getBlogPosts } from "@lib/getBlogPosts";
import { palette } from "@styles/theme";
import {
	Navbar,
	SquareLink,
	FeaturedBlog,
	BlogPost,
	Footer,
	Header,
	WaveDivider,
} from "@components";

import nordicWallpaper from "public/nordic-wallpaper.jpg";
import profilePicture from "public/profile-picture.jpg";

function ScrollRedirect({ href }) {
	return <Box id={href} sx={{ position: "relative", bottom: 100 }} />;
}

export default function Home({ posts }) {
	const theme = useTheme();

	const carouselProps = {
		navButtonsAlwaysInvisible: true,
		indicatorIconButtonProps: {
			style: {
				color: theme.palette.mode === "light" ? palette.nord4 : palette.nord1,
				"&:active": {
					backgroundColor: theme.palette.secondary.main,
				},
			},
		},
		activeIndicatorIconButtonProps: {
			style: {
				color: theme.palette.secondary.main,
			},
		},
	};

	return (
		<>
			<Head>
				<title>yunger.dev</title>
			</Head>

			<Navbar />

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
				dividerColor={
					theme.palette.mode === "light"
						? lighten(palette.nord6, 0.8)
						: theme.palette.background.paper
				}
			>
				<Box
					sx={{
						mb: 1,
						"& img": {
							borderRadius: 2.5,
						},
					}}
				>
					<Image
						priority
						src={profilePicture}
						alt="yunger profile picture"
						width={150}
						height={150}
					/>
				</Box>
				<Typography gutterBottom variant="h3" component="h1">
					yunger.dev
				</Typography>
				<Typography variant="body1">
					Hello world! I&apos;m <strong>Luís</strong>, a self-proclaimed digital
					craftsman, music enthusiast, anime connoisseur and coffee addict. I
					taught myself how to code to turn my dumb ideas into reality, and
					I&apos;ve created this place to share them with the world. Check out{" "}
					<Link passHref href="/about">
						<MuiLink sx={{ "&:hover": { bgcolor: "transparent" } }}>
							my bio
						</MuiLink>
					</Link>{" "}
					for more information.
				</Typography>
			</Header>

			<main>
				<Box
					component="section"
					sx={{
						position: "relative",
						pt: {
							xs: 5,
							md: 2.5,
						},
						pb: 20,
						bgcolor: theme =>
							theme.palette.mode === "light"
								? lighten(palette.nord6, 0.8)
								: theme.palette.background.paper,
					}}
				>
					<ScrollRedirect href="quick-access" />
					<Container maxWidth="lg">
						<Box sx={{ mb: 2 }}>
							<Typography variant="h4" component="h2">
								Quick access
							</Typography>
							<Divider />
						</Box>
						<Grid container justifyContent="space-between" spacing={4}>
							<Grid item md={3} sm={6} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/support">
									<SquareLink openInNewTab icon={CafeIcon}>
										Buy me a coffee
									</SquareLink>
								</Link>
							</Grid>
							<Grid item md={3} sm={6} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/blog">
									<SquareLink icon={DescriptionIcon}>Blog</SquareLink>
								</Link>
							</Grid>
							<Grid item md={3} sm={6} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/tools">
									<SquareLink icon={ToolsIcon}>Tools</SquareLink>
								</Link>
							</Grid>
							<Grid item md={3} sm={6} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/projects">
									<SquareLink icon={ProjectsIcon}>Projects</SquareLink>
								</Link>
							</Grid>
						</Grid>
					</Container>
					<WaveDivider
						invert
						position="bottom"
						color={theme.palette.background.default}
						height={100}
						width={200}
					/>
				</Box>

				<Box component="section" sx={{ pb: 10, pt: { xs: 5, md: 0 } }}>
					<ScrollRedirect href="posts" />
					<Container maxWidth="lg">
						<Box sx={{ mb: 2 }}>
							<Typography variant="h4" component="h2">
								Blog posts
							</Typography>
							<Divider />
						</Box>
						{!!posts.featured.length && (
							<Carousel {...carouselProps}>
								{posts.featured.map(post => (
									<Link passHref href={`/blog/${post.slug}`} key={post.id}>
										<FeaturedBlog post={post} />
									</Link>
								))}
							</Carousel>
						)}
						<Box sx={{ mt: 5 }}>
							<Grid container spacing={4}>
								{posts.latest.map(post => (
									<Grid item md={4} sm={6} xs={12} key={post.id}>
										<Link passHref href={`/blog/${post.slug}`}>
											<BlogPost post={post} />
										</Link>
									</Grid>
								))}
							</Grid>
						</Box>
					</Container>
				</Box>

				<Box
					component="section"
					sx={{
						position: "relative",
						bgcolor:
							theme.palette.mode === "light" ? palette.nord5 : palette.nord0,
						pb: 10,
						pt: 20,
					}}
				>
					<WaveDivider
						invert
						height={110}
						width={120}
						color={theme.palette.background.default}
					/>
					<ScrollRedirect href="more" />
					<Container maxWidth="lg">
						<Box sx={{ mb: 2 }}>
							<Typography variant="h4" component="h2">
								More
							</Typography>
							<Divider />
						</Box>
						<Grid container justifyContent="space-between" spacing={4}>
							<Grid item sm={4} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/about">
									<SquareLink icon={InfoIcon}>About me</SquareLink>
								</Link>
							</Grid>
							<Grid item sm={4} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/notes">
									<SquareLink icon={BookIcon}>Random notes</SquareLink>
								</Link>
							</Grid>
							<Grid item sm={4} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/contact">
									<SquareLink icon={ContactMailIcon}>Contact me</SquareLink>
								</Link>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</main>
			<Footer
				backgroundColor={
					theme.palette.mode === "light" ? palette.nord5 : palette.nord0
				}
			/>
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
