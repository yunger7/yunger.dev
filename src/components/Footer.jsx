import Link from "next/link";
import { useState } from "react";

import {
	Box,
	Container,
	Typography,
	Grid,
	Button,
	Tooltip,
	Snackbar,
	Slide,
	Alert,
} from "@mui/material";
import {
	Favorite as FavoriteIcon,
	Home as HomeIcon,
	Info as InfoIcon,
	Description as DescriptionIcon,
	Settings as SettingsIcon,
	LocalCafe as LocalCafeIcon,
} from "@mui/icons-material";
import {
	SiGithub as GithubIcon,
	SiReddit as RedditIcon,
	SiMyanimelist as MyanimelistIcon,
	SiSteam as SteamIcon,
	SiDiscord as DiscordIcon,
} from "react-icons/si";

import { palette } from "../theme";

const footerLinks = [
	{
		title: {
			name: "Home",
			href: "/",
			icon: <HomeIcon />,
		},
		links: [
			{
				name: "Quick access",
				href: "/#quick-access",
			},
			{
				name: "Latest posts",
				href: "/#posts",
			},
			{
				name: "More",
				href: "/#more",
			},
		],
	},
	{
		title: {
			name: "Blog",
			href: "/blog",
			icon: <DescriptionIcon />,
		},
		links: [
			{
				name: "Featured",
				href: "/blog/#featured",
			},
			{
				name: "Latest",
				href: "/blog/#latest",
			},
		],
	},
	{
		title: {
			name: "Projects",
			href: "/projects",
			icon: <SettingsIcon />,
		},
		links: [
			{
				name: "Animelist",
				href: "/animelist",
			},
		],
	},
	{
		title: {
			name: "Info",
			href: null,
			icon: <InfoIcon />,
		},
		links: [
			{
				name: "About me",
				href: "/about",
			},
		],
	},
	{
		title: {
			name: "Other",
			href: null,
			icon: null,
		},
		links: [
			{
				name: "Contact me",
				href: "/contact",
			},
			{
				name: "Random notes",
				href: "/notes",
			},
		],
	},
];

export function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				minHeight: 300,
				pt: 2.5,
				pb: 5,
				bgcolor: palette.nord1,
			}}
		>
			<Container
				maxWidth="lg"
				sx={theme => ({
					height: 1,
					display: "flex",
					justifyContent: "space-between",
					[theme.breakpoints.down("md")]: {
						flexDirection: "column",
						alignItems: "center",
						gap: theme.spacing(5),
					},
				})}
			>
				<Box
					sx={{
						width: { xs: "65%", sm: "30%", md: "20%" },
						textAlign: { xs: "center", md: "left" },
					}}
				>
					<div>
						<Typography
							variant="h5"
							sx={{
								fontWeight: 500,
								mb: { xs: 2, md: 1.15 },
							}}
						>
							yunger.dev
						</Typography>
						<SocialMediaIcons />
					</div>
					<Box sx={{ color: palette.nord4 }}>
						<Typography variant="body2">
							&copy; 2021 - {new Date().getFullYear()} yunger
						</Typography>
						<Typography variant="body2">
							Build with <FavoriteIcon color="primary" sx={{ fontSize: 14 }} />{" "}
							and JavaScript
						</Typography>
						<Typography variant="body2">v0.1.0 (In development)</Typography>
					</Box>
					<Button
						variant="outlined"
						color="primary"
						href="https://ko-fi.com/yunger"
						target="_blank"
						rel="noreferrer"
						startIcon={<LocalCafeIcon />}
						sx={{
							mt: 3,
							width: 1,
						}}
					>
						Buy me a coffee
					</Button>
				</Box>
				<Grid
					container
					sx={{
						justifyContent: { xs: "space-between", md: "flex-end" },
					}}
				>
					{footerLinks.map((section, index) => (
						<LinkSection section={section} key={index} />
					))}
				</Grid>
			</Container>
		</Box>
	);
}

function LinkSection({ section }) {
	const { title, links } = section;

	const SectionTitle = ({ title }) => {
		return (
			<Typography
				component="span"
				sx={theme => ({
					fontFamily: "Rubik",
					fontSize: "large",
					display: "flex",
					alignItems: "flex-start",
					gap: theme.spacing(1),
					[theme.breakpoints.down("sm")]: {
						justifyContent: "center",
					},
				})}
			>
				{title.icon}
				{title.name}
			</Typography>
		);
	};

	const SectionLink = ({ link }) => {
		return (
			<Typography
				sx={{
					fontFamily: "Rubik",
					fontSize: 15,
					mb: 1,
					transition: "all .2s",
					":hover": {
						color: palette.nord5,
					},
				}}
			>
				{link.name}
			</Typography>
		);
	};

	return (
		<Grid
			item
			sm={2}
			xs={12}
			sx={{
				color: palette.nord4,
				textAlign: { xs: "center", sm: "left" },
				mb: { xs: 2.5, sm: 0 },
			}}
		>
			<Box sx={{ mb: 2, borderBottom: `1px solid ${palette.nord3}` }}>
				{title.href ? (
					<Link href={title.href}>
						<a>
							<SectionTitle title={title} />
						</a>
					</Link>
				) : (
					<SectionTitle title={title} />
				)}
			</Box>
			<div>
				{links.map((link, index) =>
					link.href ? (
						<Link href={link.href} key={index}>
							<a>
								<SectionLink link={link} />
							</a>
						</Link>
					) : (
						<SectionLink link={link} />
					)
				)}
			</div>
		</Grid>
	);
}

function SocialMediaIcons() {
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
