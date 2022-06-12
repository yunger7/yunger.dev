import Head from "next/head";
import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { getNotionPageContent } from "@lib/getNotionPageContent";
import { useBlockRenderer } from "@hooks/useBlockRenderer";
import { Navbar, Header, Footer } from "@components";

import nordicWallpaper from "public/nordic-wallpaper.jpg";
import profilePicture from "public/profile-picture.jpg";

const navbarPaths = [
	{
		name: "yunger.dev",
		href: "/",
	},
	{
		name: "About",
		href: "/about",
	},
];

export default function About({ content }) {
	const theme = useTheme();
	const jsxContent = useBlockRenderer(content);

	return (
		<>
			<Head>
				<title>About | yunger.dev</title>
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
				dividerColor={theme.palette.background.paper}
			>
				<Box sx={{ mb: 1, "& img": { borderRadius: 2.5 } }}>
					<Image
						priority
						src={profilePicture}
						alt="yunger profile picture"
						width={150}
						height={150}
					/>
				</Box>
				<Typography variant="h3" component="h1">
					About
				</Typography>
				<Typography
					variant="subtitle1"
					sx={{ maxWidth: { xs: "unset", sm: "70%" } }}
				>
					Where am I? Who are you? What is this place and why is it so cold in
					here?
				</Typography>
			</Header>

			<Box component="main">
				<Box
					component="section"
					sx={{
						pt: 5,
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

export async function getStaticProps() {
	const aboutPageId = process.env.NOTION_ABOUT_PAGE_ID;

	const content = await getNotionPageContent(aboutPageId);

	return {
		props: {
			content,
		},
		revalidate: 86400, // 24 hours
	};
}
