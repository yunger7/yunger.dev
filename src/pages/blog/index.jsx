import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Carousel from "react-material-ui-carousel";

import {
	Box,
	Container,
	Grid,
	Typography,
	Divider,
	useTheme,
} from "@mui/material";
import { Description as DescriptionIcon } from "@mui/icons-material";

import {
	Navbar,
	Header,
	FeaturedBlog,
	BlogPost,
	Footer,
	WaveDivider,
} from "../../components";

import { getBlogPosts } from "../../lib/getBlogPosts";
import { palette } from "../../styles/theme";

import nordicWallpaper from "../../../public/nordic-wallpaper.jpg";

function ScrollRedirect({ href }) {
	return <Box id={href} sx={{ position: "relative", bottom: 100 }} />;
}

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

export default function Blog({ posts }) {
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
						objectFit="cover"
						placeholder="blur"
					/>
				}
				dividerColor={
					theme.palette.mode === "light"
						? "#ffffff"
						: theme.palette.background.paper
				}
			>
				<DescriptionIcon sx={{ fontSize: 80 }} />
				<Typography variant="h3" component="h1">
					Blog posts
				</Typography>
			</Header>

			<Box component="main">
				<Box
					component="section"
					sx={{
						position: "relative",
						pt: 5,
						pb: 20,
						bgcolor: theme => theme.palette.background.paper,
					}}
				>
					<ScrollRedirect href="featured" />
					<Container maxWidth="lg">
						{!!posts.featured.length && (
							<>
								<Box sx={{ mb: 2 }}>
									<Typography variant="h4" component="h2">
										Featured
									</Typography>
									<Divider />
								</Box>
								<Carousel {...carouselProps}>
									{posts.featured.map(post => (
										<Link passHref href={`/blog/${post.slug}`} key={post.id}>
											<FeaturedBlog post={post} />
										</Link>
									))}
								</Carousel>
							</>
						)}
					</Container>
					<WaveDivider
						invert
						height={120}
						width={150}
						position="bottom"
						color={theme.palette.background.default}
					/>
				</Box>

				<Box
					component="section"
					sx={{
						bgcolor: theme => theme.palette.background.default,
						pt: 2.5,
						pb: 10,
					}}
				>
					<ScrollRedirect href="latest" />
					<Container maxWidth="lg">
						<Box sx={{ mb: 2 }}>
							<Typography variant="h4" component="h2">
								Latest
							</Typography>
							<Divider />
						</Box>
						<Grid container spacing={4}>
							{posts.latest.map(post => (
								<Grid item md={4} sm={6} xs={12} key={post.id}>
									<Link passHref href={`/blog/${post.slug}`}>
										<BlogPost post={post} />
									</Link>
								</Grid>
							))}
						</Grid>
					</Container>
				</Box>
			</Box>
			<Footer backgroundColor={theme.palette.background.default} />
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
