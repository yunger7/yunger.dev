import Head from "next/head";
import Image from "next/image";

import { Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import makeStyles from '@mui/styles/makeStyles';

import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { WaveDivider4 } from "../components/dividers/WaveDivider4";
import { Footer } from "../components/Footer";

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

const useStyles = makeStyles(theme => ({
	profileImage: {
		marginBottom: theme.spacing(1),

		"& img": {
			borderRadius: 10,
		},
	},
	content: {
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(10),
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function About({ content }) {
	const classes = useStyles();
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
						src={nordicWallpaper}
						alt="Nordic Wallpaper"
						layout="fill"
						placeholder="blur"
						objectFit="cover"
						priority
					/>
				}
				dividerColor={theme.palette.background.paper}
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
				<Typography variant="h3" component="h1">
					About me
				</Typography>
				<Typography variant="subtitle1">
					A little bit of info about <strong>yunger</strong>, the
					creator of this website.
				</Typography>
			</Header>

			<main className={classes.page}>
				<section className={classes.content}>
					<Container maxWidth="md">{jsxContent}</Container>
				</section>
			</main>

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
