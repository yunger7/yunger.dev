import Link from "next/link";
import Image from "next/image";
import {
	Container,
	Grid,
	Card,
	CardContent,
	Typography,
	Divider,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
	ShoppingCart as ShoppingCartIcon,
	LiveTv as LiveTvIcon,
	Description as DescriptionIcon,
	KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@material-ui/icons";

import { Header } from "../components/Header";
import { SquareLink } from "../components/SquareLink";

import nordicWallpaper from "../../public/nordic-wallpaper.jpg";
import profilePicture from "../../public/profile-picture.jpg";

const useStyles = makeStyles(theme => ({
	page: {
		paddingTop: theme.spacing(6),
	},
	introductionCard: {
		width: "100%",
	},
	introductionCardContent: {
		padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
	},
	profile: {
		display: "flex",
		maxHeight: 100,
	},
	profileName: {
		display: "flex",
		flexDirection: "column",
	},
	profileImage: {
		position: "relative",
		bottom: 100,
		marginRight: theme.spacing(2.5),
		"& img": {
			borderRadius: theme.shape.borderRadius,
		},
	},
	projects: {
		marginTop: theme.spacing(5),
	},
	squareLinksWrapper: {
		marginTop: theme.spacing(2),
	},
	squareLink: {
		width: 200,
		height: 200,
	},
}));

export default function Home() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<>
			<Header />
			<Container className={classes.page} maxWidth="lg">
				<Card className={classes.introductionCard}>
					<Image
						src={nordicWallpaper}
						alt="Snow mountain wallpaper"
						width={theme.breakpoints.values.lg}
						height={300}
						placeholder="blur"
						objectFit="cover"
					/>
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
								<Typography variant="h3">Luís Galete</Typography>
								<Typography variant="subtitle1">yunger</Typography>
							</div>
						</div>
						<div>
							<Typography variant="body1">
								Hello world 👋 <br /> I&apos;m <strong>Luís</strong>, a programmer,
								musician and coffee enthusiast. I taught myself how to code to
								turn my dumb ideas into reality, and I&apos;ve created this place to
								share them with the world.
							</Typography>
						</div>
					</CardContent>
				</Card>

				<section className={classes.projects}>
					<Typography variant="h4" component="h2">
						Projects
					</Typography>
					<Divider />

					<Grid
						container
						className={classes.squareLinksWrapper}
						justifyContent="space-between"
						spacing={4}
					>
						<Grid item md={3} sm={6} xs={12} className={classes.squareLink}>
							<Link href="/shop" passHref>
								<SquareLink icon={ShoppingCartIcon}>Shop</SquareLink>
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
									More projects
								</SquareLink>
							</Link>
						</Grid>
					</Grid>
				</section>
			</Container>
		</>
	);
}
