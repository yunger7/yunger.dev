import Head from "next/head";
import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Navbar, Header, Footer } from "../components";
import { WaveDivider4 } from "../components/dividers";

import { getNotionPageContent } from "../lib/getNotionPageContent";
import { useBlockRenderer } from "../hooks/useBlockRenderer";

import nordicWallpaper from "../../public/nordic-wallpaper.jpg";
import profilePicture from "../../public/profile-picture.jpg";

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
				<title>About me</title>
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
					About me
				</Typography>
				<Typography variant="subtitle1">
					A little bit of info about <strong>yunger</strong>, the creator of
					this website.
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

			<WaveDivider4
				backgroundColor={theme.palette.background.paper}
				color="#242933"
			/>

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
