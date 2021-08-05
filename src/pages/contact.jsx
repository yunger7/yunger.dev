import Head from "next/head";
import Image from "next/image";

import {
	Container,
	Card,
	CardContent,
	Typography,
	Grid,
	TextField,
	Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Email as MessageIcon, Send as SendIcon } from "@material-ui/icons";

import { Header } from "../components/Header";
import { WaveDivider1 } from "../components/dividers/WaveDivider1";
import { WaveDivider4 } from "../components/dividers/WaveDivider4";
import { Footer } from "../components/Footer";

import placeholder3 from "../../public/placeholder3.jpg";

const headerPaths = [
	{
		name: "yunger.dev",
		href: "/",
	},
	{
		name: "Contact",
		href: "/contact",
	},
];

const useStyles = makeStyles(theme => ({
	page: {
		paddingTop: theme.spacing(6),
	},
	introduction: {
		paddingBottom: theme.spacing(5),
	},
	introductionWallpaper: {
		position: "relative",
		width: "100%",
		height: 250,
	},
	introductionCardContent: {
		padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
		maxHeight: 125,
		display: "flex",
	},
	messageIcon: {
		fontSize: 160,
		position: "relative",
		bottom: 75,
		marginRight: theme.spacing(2.5),
	},
	form: {
		backgroundColor: "#282e39",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
	},
}));

export default function Contact() {
	const classes = useStyles();

	return (
		<>
			<Head>
				<title>Contact me</title>
			</Head>

			<Header paths={headerPaths} />

			<main className={classes.page}>
				<section className={classes.introduction}>
					<Container maxWidth="lg">
						<Card>
							<div className={classes.introductionWallpaper}>
								<Image
									src={placeholder3}
									alt=""
									layout="fill"
									objectFit="cover"
									placeholder="blur"
								/>
							</div>
							<CardContent className={classes.introductionCardContent}>
								<MessageIcon className={classes.messageIcon} />
								<div>
									<Typography variant="h5" component="h1">
										Send me a message!
									</Typography>
									<Typography variant="body1">
										Want to say hi? Just send a message bellow.
									</Typography>
								</div>
							</CardContent>
						</Card>
					</Container>
				</section>

				<WaveDivider1 color="#292e39" />

				<section className={classes.form}>
					<Container maxWidth="md">
						<form noValidate autoComplete="off">
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<TextField
										fullWidth
										required
										id="subject"
										variant="outlined"
										label="Subject"
										autoComplete="off"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										id="name"
										variant="outlined"
										label="Name"
										autoComplete="off"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										id="email"
										type="email"
										variant="outlined"
										label="Email"
										autoComplete="off"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										multiline
										required
										id="message"
										variant="outlined"
										label="Message"
										rows={5}
										autoComplete="off"
									/>
								</Grid>
								<Grid item xs={4}>
									<Button
										disableRipple
										type="submit"
										variant="contained"
										color="primary"
										startIcon={<SendIcon />}
									>
										Send message
									</Button>
								</Grid>
							</Grid>
						</form>
					</Container>
				</section>
			</main>

      <WaveDivider4 backgroundColor="#292e39" />

      <Footer />
		</>
	);
}
