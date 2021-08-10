import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Home as HomeIcon } from "@material-ui/icons";

import { nordPalette } from "../theme";

import placeholder2 from "../../public/placeholder2.jpg";

const useStyles = makeStyles({
	page: {
		position: "absolute",
		width: "100vw",
		height: "100vh",
		overflow: "hidden",
		backgroundColor: `${nordPalette.nord0}aa`,

		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		position: "relative",
		width: "100vw",
		height: "100vh",
		zIndex: -1,
		filter: "blur(10px)",
		userSelect: "none",
	},
});

export default function NotFound() {
	const classes = useStyles();

	return (
		<>
			<Head>
				<title>404 | Page not found</title>
			</Head>
			<main className={classes.page}>
				<Typography variant="h1" gutterBottom>
					(404) Woops (っ °Д °;)っ
				</Typography>
				<Typography variant="h5" gutterBottom>
					Hurry up and go home before you catch a cold!
				</Typography>
				<Link href="/" passHref>
					<Button variant="contained" color="primary" startIcon={<HomeIcon />} disableRipple>
						Go home
					</Button>
				</Link>
			</main>
			<div className={classes.image}>
				<Image
					priority
					src={placeholder2}
					alt="Snow mountains"
					layout="fill"
					objectFit="cover"
					placeholder="blur"
				/>
			</div>
		</>
	);
}
