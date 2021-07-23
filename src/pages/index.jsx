import Image from "next/image";
import { Container, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Header } from "../components/Header";

import nordicWallpaper from "../../public/nordic-wallpaper.jpg";
import profilePicture from "../../public/profile-picture.jpg";

const useStyles = makeStyles(theme => ({
  page: {
    paddingTop: theme.spacing(7.5),
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
								<Image src={profilePicture} width={175} height={175} priority />
							</div>
							<div className={classes.profileName}>
								<Typography variant="h3">Luís Galete</Typography>
								<Typography variant="subtitle1">yunger</Typography>
							</div>
						</div>
						<div>
							<Typography variant="body1">
								Hello world 👋 <br /> I'm <strong>Luís</strong>, a programmer, musician and coffee
								enthusiast. I taught myself how to code to turn my dumb ideas
								into reality, and I've created this place to share them with the
								world.
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}
