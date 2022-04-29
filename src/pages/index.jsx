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
	LocalCafe as CoffeeIcon,
	Construction as ToolsIcon,
	HistoryEdu as PaperIcon,
	Settings as ProjectsIcon,
	Info as AboutIcon,
	Book as NotesIcon,
	ContactMail as ContactIcon,
} from "@mui/icons-material";

import { getPapers } from "@lib/getPapers";
import { palette } from "@styles/theme";
import {
	Navbar,
	SquareLink,
	FeaturedPaper,
	PaperCard,
	Footer,
	Header,
	WaveDivider,
} from "@components";

import nordicWallpaper from "public/nordic-wallpaper.jpg";
import profilePicture from "public/profile-picture.jpg";

function ScrollRedirect({ href }) {
	return <Box id={href} sx={{ position: "relative", bottom: 100 }} />;
}

export default function Home({ papers }) {
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
									<SquareLink openInNewTab icon={CoffeeIcon}>
										Buy me a coffee
									</SquareLink>
								</Link>
							</Grid>
							<Grid item md={3} sm={6} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/papers">
									<SquareLink icon={PaperIcon}>Papers</SquareLink>
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
					<ScrollRedirect href="papers" />
					<Container maxWidth="lg">
						<Box sx={{ mb: 2 }}>
							<Typography variant="h4" component="h2">
								Papers
							</Typography>
							<Divider />
						</Box>
						{!!papers.featured.length && (
							<Carousel {...carouselProps}>
								{papers.featured.map(paper => (
									<Link passHref href={`/papers/${paper.slug}`} key={paper.id}>
										<FeaturedPaper paper={paper} />
									</Link>
								))}
							</Carousel>
						)}
						<Box sx={{ mt: 5 }}>
							<Grid container spacing={4}>
								{papers.latest.map(paper => (
									<Grid item md={4} sm={6} xs={12} key={paper.id}>
										<Link passHref href={`/papers/${paper.slug}`}>
											<PaperCard paper={paper} />
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
									<SquareLink icon={AboutIcon}>About me</SquareLink>
								</Link>
							</Grid>
							<Grid item sm={4} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/notes">
									<SquareLink icon={NotesIcon}>Random notes</SquareLink>
								</Link>
							</Grid>
							<Grid item sm={4} xs={12} sx={{ width: 200, height: 200 }}>
								<Link passHref href="/contact">
									<SquareLink icon={ContactIcon}>Contact me</SquareLink>
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
	const papers = await getPapers();

	return {
		props: {
			papers,
		},
		revalidate: 60 * 60 * 8, // 8 hours
	};
}
