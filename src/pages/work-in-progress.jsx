import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Box, Button, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
	Home as HomeIcon,
	Settings as SettingsIcon,
} from "@mui/icons-material";

import { palette } from "../theme";
import placeholder2 from "../../public/placeholder2.jpg";

export default function WorkInProgress() {
	return (
		<>
			<Head>
				<title>Work in progress</title>
			</Head>
			<Box
				component="main"
				sx={{
					position: "absolute",
					width: "100vw",
					height: "100vh",
					overflow: "hidden",
					background: alpha(palette.nord0, 0.6),
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<SettingsIcon sx={{ fontSize: 48 }} />
				<Typography variant="h1" align="center">
					Work in progress
				</Typography>
				<Typography gutterBottom variant="h5" align="center">
					Hurry up and go home before you catch a cold!
				</Typography>
				<Link passHref href="/">
					<Button
						disableRipple
						variant="contained"
						color="primary"
						startIcon={<HomeIcon />}
						sx={{ mt: 2 }}
					>
						Go home
					</Button>
				</Link>
			</Box>
			<Box
				sx={{
					position: "relative",
					width: "100vw",
					height: "100vh",
					zIndex: -1,
					filter: "blur(10px)",
					userSelect: "none",
				}}
			>
				<Image
					priority
					src={placeholder2}
					alt="Snow mountains"
					layout="fill"
					objectFit="cover"
					placeholder="blur"
				/>
			</Box>
		</>
	);
}
