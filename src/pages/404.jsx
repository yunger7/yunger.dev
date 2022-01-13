import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Button, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Home as HomeIcon } from "@mui/icons-material";

import { palette } from "../theme";

import placeholder2 from "../../public/placeholder2.jpg";

const useStyles = makeStyles({
	page: {
		position: "absolute",
		width: "100vw",
		height: "100vh",
		overflow: "hidden",
		backgroundColor: `${palette.nord0}aa`,

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
	line: {
		display: "inline-block",
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
				<Typography variant="h1" align="center" gutterBottom>
					<span className={classes.line}>(404) Woops </span>{" "}
					<span className={classes.line}>(っ °Д °;)っ</span>
				</Typography>
				<Typography variant="h5" align="center" gutterBottom>
					Hurry up and go home before you catch a cold!
				</Typography>
				<Link href="/" passHref>
					<Button
						variant="contained"
						color="primary"
						startIcon={<HomeIcon />}
						disableRipple
					>
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
