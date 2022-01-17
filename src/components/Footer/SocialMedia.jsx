import { useState } from "react";

import { Box, Slide, Snackbar, Alert, Tooltip } from "@mui/material";
import {
	SiGithub as GithubIcon,
	SiReddit as RedditIcon,
	SiMyanimelist as MyanimelistIcon,
	SiSteam as SteamIcon,
	SiDiscord as DiscordIcon,
} from "react-icons/si";

import { palette } from "../../theme";

export function SocialMedia() {
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	async function handleDiscordClick() {
		await navigator.clipboard.writeText("yunger#3461");
		setSnackbarOpen(true);
	}

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				mb: 3,

				"& a, & span": {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				},

				"& svg": {
					fill: palette.nord4,
					transition: "all .2s",
					width: { xs: 24, md: 22 },
					height: { xs: 24, md: 22 },

					":hover": {
						fill: "#ffffff",
					},
				},
			}}
		>
			{/* GitHub */}
			<a href="https://github.com/yunger7" target="_blank" rel="noreferrer">
				<GithubIcon />
			</a>

			{/* Reddit */}
			<a
				href="https://www.reddit.com/user/yunger_"
				target="_blank"
				rel="noreferrer"
			>
				<RedditIcon />
			</a>

			{/* MyAnimeList */}
			<a
				href="https://myanimelist.net/profile/yunger"
				target="_blank"
				rel="noreferrer"
			>
				<MyanimelistIcon />
			</a>

			{/* Steam */}
			<a
				href="https://steamcommunity.com/id/yunger/"
				target="_blank"
				rel="noreferrer"
			>
				<SteamIcon />
			</a>

			{/* Discord */}
			<Tooltip arrow title="yunger#3461" onClick={handleDiscordClick}>
				<Box component="span" sx={{ cursor: "pointer" }}>
					<DiscordIcon />
				</Box>
			</Tooltip>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={() => setSnackbarOpen(false)}
				TransitionComponent={Slide}
			>
				<Alert severity="success" variant="filled">
					Copied to clipboard!
				</Alert>
			</Snackbar>
		</Box>
	);
}
