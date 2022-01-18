import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Box, Button, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Home as HomeIcon } from "@mui/icons-material";

import { palette } from "../styles/theme";

import placeholder2 from "../../public/placeholder2.jpg";

export default function NotFound() {
	return (
		<>
			<Head>
				<title>404 | Page not found</title>
			</Head>
			<Box
				component="main"
				sx={{
					position: "absolute",
					width: "100vw",
					height: "100vh",
					overflow: "hidden",
					bgcolor: alpha(palette.nord0, 0.6),
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="h1" align="center">
					<Box component="span" sx={{ display: "inline-block" }}>
						Woops{" "}
					</Box>{" "}
					<Box component="span" sx={{ display: "inline-block" }}>
						(っ °Д °;)っ
					</Box>
				</Typography>
				<Typography variant="h5" align="center">
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
