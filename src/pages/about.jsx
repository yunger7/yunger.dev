import Head from "next/head";
import Image from "next/image";

import { Container, Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Navbar } from "../components/Navbar";
import { WaveDivider4 } from "../components/dividers/WaveDivider4";
import { WaveDivider1 } from "../components/dividers/WaveDivider1";
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
	page: {
		paddingTop: theme.spacing(6),
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
	content: {
		paddingTop: theme.spacing(2.5),
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
									priority
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
										<Typography variant="h3" component="h1">
											About me
										</Typography>
										<Typography variant="subtitle1">
											A little bit of info about <strong>yunger</strong>, the
											creator behind this website.
										</Typography>
									</div>
								</div>
							</CardContent>
						</Card>
					</Container>
				</section>

				<WaveDivider1 background={theme.palette.background.paper} />

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
