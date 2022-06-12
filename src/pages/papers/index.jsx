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
import { HistoryEdu as PaperIcon } from "@mui/icons-material";

import { getPapers } from "@lib/getPapers";
import { palette } from "@styles/theme";
import {
	Navbar,
	Header,
	FeaturedPaper,
	PaperCard,
	Footer,
	WaveDivider,
} from "@components";

import nordicWallpaper from "public/nordic-wallpaper.jpg";

function ScrollRedirect({ href }) {
	return <Box id={href} sx={{ position: "relative", bottom: 100 }} />;
}

const navbarPaths = [
	{
		name: "yunger.dev",
		href: "/",
	},
	{
		name: "Papers",
		href: "/papers",
	},
];

export default function Papers({ papers }) {
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
				<title>Papers | yunger.dev</title>
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
				<PaperIcon sx={{ fontSize: 80, position: "relative", right: 5 }} />
				<Typography variant="h3" component="h1">
					Papers
				</Typography>
				<Typography
					variant="subtitle1"
					sx={{ maxWidth: { xs: "unset", sm: "70%" } }}
				>
					Bits of information scattered around. Pick up anything you find
					valuable
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
						{!!papers.featured.length && (
							<>
								<Box sx={{ mb: 2 }}>
									<Typography variant="h4" component="h2">
										Featured
									</Typography>
									<Divider />
								</Box>
								<Carousel {...carouselProps}>
									{papers.featured.map(paper => (
										<Link
											passHref
											href={`/papers/${paper.slug}`}
											key={paper.id}
										>
											<FeaturedPaper paper={paper} />
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
							{papers.latest.map(paper => (
								<Grid item md={4} sm={6} xs={12} key={paper.id}>
									<Link passHref href={`/papers/${paper.slug}`}>
										<PaperCard paper={paper} />
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
	const papers = await getPapers();

	return {
		props: {
			papers,
		},
		revalidate: 60 * 60 * 8, // 8 hours
	};
}
