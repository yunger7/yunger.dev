import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Carousel from "react-material-ui-carousel";

import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import { Description as DescriptionIcon } from "@mui/icons-material";

import {
	Navbar,
	Header,
	FeaturedBlog,
	BlogPost,
	Footer,
	WaveDivider,
} from "../../components";
import { WaveDivider4 } from "../../components/dividers";

import { getBlogPosts } from "../../lib/getBlogPosts";
import { palette } from "../../theme";

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

export default function Blog({ posts }) {
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
				dividerColor="#242933"
			>
				<DescriptionIcon sx={{ fontSize: 80 }} />
				<Typography variant="h3" component="h1">
					Blog posts
				</Typography>
			</Header>

			<Box component="main">
				<Box component="section" sx={{ position: "relative", pt: 5, pb: 20 }}>
					<ScrollRedirect href="featured" />
					<Container maxWidth="lg">
						<Box sx={{ mb: 2 }}>
							<Typography variant="h4" component="h2">
								Featured
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
					</Container>
					<WaveDivider
						invert
						height={120}
						width={150}
						position="bottom"
						color="#292e39"
					/>
				</Box>

				<Box component="section" sx={{ bgcolor: "#292e39", pt: 2.5, pb: 10 }}>
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
