import Link from "next/link";
import { useState } from "react";
import {
	Container,
	Typography,
	Grid,
	Button,
	Tooltip,
	Snackbar,
	Slide,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
	Favorite as FavoriteIcon,
	Home as HomeIcon,
	ShoppingCart as ShoppingCartIcon,
	Description as DescriptionIcon,
	Settings as SettingsIcon,
	LocalCafe as LocalCafeIcon,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { nordPalette } from "../theme";

const footerLinks = [
	{
		title: {
			name: "Home",
			href: "/",
			icon: HomeIcon,
		},
		links: [
			{
				name: "Projects",
				href: "/#projects",
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
			name: "Shop",
			href: "/shop",
			icon: ShoppingCartIcon,
		},
		links: [],
	},
	{
		title: {
			name: "Blog",
			href: "/blog",
			icon: DescriptionIcon,
		},
		links: [],
	},
	{
		title: {
			name: "Projects",
			href: "/projects",
			icon: SettingsIcon,
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
			name: "Other",
			href: null,
			icon: null,
		},
		links: [
			{
				name: "About me",
				href: "/about",
			},
			{
				name: "Random notes",
				href: "/notes",
			},
			{
				name: "Contact me",
				href: "/contact",
			},
		],
	},
];

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 300,
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5),
		backgroundColor: nordPalette.nord1,
	},
	container: {
		height: "100%",
		display: "flex",
		justifyContent: "space-between",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			alignItems: "center",
			gap: theme.spacing(5),
		},
	},
	info: {
		width: "20%",
		[theme.breakpoints.down("sm")]: {
			width: "30%",
			textAlign: "center",
		},
		[theme.breakpoints.down("xs")]: {
			width: "65%",
		},
	},
	websiteTitle: {
		fontWeight: 500,
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(2),
		},
	},
	copyright: {
		color: nordPalette.nord4,
	},
	supportButton: {
		marginTop: theme.spacing(3),
		width: "100%",
	},
	links: {
		justifyContent: "flex-end",
		[theme.breakpoints.down("sm")]: {
			justifyContent: "space-between",
		},
	},
}));

export function Footer() {
	const classes = useStyles();

	return (
		<footer className={classes.root}>
			<Container className={classes.container} maxWidth="lg">
				<div className={classes.info}>
					<div>
						<Typography
							className={classes.websiteTitle}
							variant="h5"
							gutterBottom
						>
							yunger.dev
						</Typography>
						<SocialMedia />
					</div>
					<div className={classes.copyright}>
						<Typography variant="body2">
							&copy; 2021 - {new Date().getFullYear()} yunger
						</Typography>
						<Typography variant="body2">
							Build with{" "}
							<FavoriteIcon color="primary" style={{ fontSize: 14 }} /> and
							JavaScript
						</Typography>
						<Typography variant="body2">v0.1.0 (In development)</Typography>
					</div>
					<Button
						className={classes.supportButton}
						startIcon={<LocalCafeIcon />}
						variant="outlined"
						color="primary"
						href="https://ko-fi.com/yunger"
						target="_blank"
						rel="noreferrer"
					>
						Buy me a coffee
					</Button>
				</div>
				<Grid container className={classes.links}>
					{footerLinks.map((item, index) => (
						<LinkSection item={item} key={index} />
					))}
				</Grid>
			</Container>
		</footer>
	);
}

const useLinkSectionStyles = makeStyles(theme => ({
	root: {
		color: nordPalette.nord4,
		[theme.breakpoints.down("xs")]: {
			textAlign: "center",
			marginBottom: theme.spacing(2.5),
		},
	},
	title: {
		marginBottom: theme.spacing(2),
		borderBottom: `1px solid ${nordPalette.nord3}`,
	},
	titleText: {
		fontFamily: "Rubik",
		fontSize: "large",
		display: "flex",
		alignItems: "flex-start",
		gap: theme.spacing(1),
		[theme.breakpoints.down("xs")]: {
			justifyContent: "center",
		},
	},
	linkText: {
		fontFamily: "Rubik",
		fontSize: 15,
		marginBottom: theme.spacing(1),
		transition: "all .2s",
		"&:hover": {
			color: nordPalette.nord5,
		},
	},
}));

function LinkSection({ item }) {
	const classes = useLinkSectionStyles();

	const { title, links } = item;
	const Icon = title.icon;

	return (
		<Grid item className={classes.root} sm={2} xs={12}>
			<div className={classes.title}>
				{title.href ? (
					<Link href={title.href}>
						<a>
							<Typography className={classes.titleText} component="span">
								{Icon && <Icon />}
								{title.name}
							</Typography>
						</a>
					</Link>
				) : (
					<Typography className={classes.titleText} component="span">
						{Icon && <Icon />}
						{title.name}
					</Typography>
				)}
			</div>
			<div>
				{links.map((link, index) => {
					if (link.href) {
						return (
							<Link href={link.href} key={index}>
								<a>
									<Typography className={classes.linkText}>
										{link.name}
									</Typography>
								</a>
							</Link>
						);
					}

					return (
						<Typography className={classes.linkText} key={index}>
							{link.name}
						</Typography>
					);
				})}
			</div>
		</Grid>
	);
}

const useSocialMediaStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: theme.spacing(3),
	},
	icon: {
		fill: nordPalette.nord4,
		transition: "all .2s",
		"&:hover": {
			fill: "#ffffff",
		},
	},
	tooltip: {
		cursor: "pointer",
	},
}));

function SocialMedia() {
	const classes = useSocialMediaStyles();
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	async function handleDiscordClick() {
		await navigator.clipboard.writeText("yunger#3461");
		setSnackbarOpen(true);
	}

	return (
		<div className={classes.root}>
			{/* GitHub */}
			<a href="https://github.com/yunger7" target="_blank" rel="noreferrer">
				<svg
					className={classes.icon}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<path fill="none" d="M0 0h24v24H0z" />
					<path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
				</svg>
			</a>

			{/* Reddit */}
			<a
				href="https://www.reddit.com/user/yunger_"
				target="_blank"
				rel="noreferrer"
			>
				<svg
					className={classes.icon}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<path fill="none" d="M0 0h24v24H0z" />
					<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm6.67-10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23L13 6.65l2.14.45a1 1 0 1 0 .13-.61L12.82 6a.31.31 0 0 0-.37.24l-.74 3.47a7.14 7.14 0 0 0-3.9 1.23 1.46 1.46 0 1 0-1.61 2.39 2.87 2.87 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 0 0 0-.44 1.46 1.46 0 0 0 .81-1.33zm-10 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.81 2.75a3.84 3.84 0 0 1-2.47.77 3.84 3.84 0 0 1-2.47-.77.27.27 0 0 1 .38-.38A3.27 3.27 0 0 0 12 16a3.28 3.28 0 0 0 2.09-.61.28.28 0 1 1 .39.4v-.04zm-.18-1.71a1 1 0 1 1 1-1 1 1 0 0 1-1.01 1.04l.01-.04z" />
				</svg>
			</a>

			{/* MyAnimeList */}
			<a
				href="https://myanimelist.net/profile/yunger"
				target="_blank"
				rel="noreferrer"
			>
				<svg
					className={classes.icon}
					version="1.0"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 256.000000 256.000000"
					preserveAspectRatio="xMidYMid meet"
				>
					<g
						transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
						stroke="none"
					>
						<path
							d="M0 1280 l0 -1280 1280 0 1280 0 0 1280 0 1280 -1280 0 -1280 0 0
							-1280z m570 294 c71 -100 75 -104 90 -85 8 11 44 58 80 105 l65 86 93 0 92 0
							0 -345 0 -345 -90 0 -90 0 -2 206 -3 206 -75 -90 c-41 -50 -78 -91 -82 -91 -4
							-1 -40 40 -80 90 l-73 91 -3 -206 -2 -206 -90 0 -90 0 0 345 0 345 93 0 92 -1
							75 -105z m1120 51 c9 -27 20 -60 24 -72 l7 -23 -136 0 c-184 0 -229 -22 -260
							-124 l-14 -46 89 0 90 0 0 75 0 75 100 0 100 0 0 -260 0 -260 -100 0 -100 0 0
							115 0 115 -109 0 -109 0 14 -61 c8 -33 25 -84 39 -113 14 -29 25 -55 25 -58 0
							-5 -136 -98 -144 -98 -7 0 -63 140 -88 220 -19 61 -23 97 -23 195 0 118 1 121
							35 184 38 71 103 127 185 159 71 28 84 30 229 28 l129 -1 17 -50z m320 -215
							l0 -270 125 0 c69 0 125 -3 125 -7 -1 -5 -9 -37 -19 -73 l-18 -65 -197 -3
							-196 -2 0 345 0 345 90 0 90 0 0 -270z"
						/>
					</g>
				</svg>
			</a>

			{/* Steam */}
			<a
				href="https://steamcommunity.com/id/yunger/"
				target="_blank"
				rel="noreferrer"
			>
				<svg
					className={classes.icon}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<path fill="none" d="M0 0H24V24H0z" />
					<path d="M12.004 2c-5.25 0-9.556 4.05-9.964 9.197l5.36 2.216c.454-.31 1.002-.492 1.593-.492.053 0 .104.003.157.005l2.384-3.452v-.049c0-2.08 1.69-3.77 3.77-3.77 2.079 0 3.77 1.692 3.77 3.772s-1.692 3.771-3.77 3.771h-.087l-3.397 2.426c0 .043.003.088.003.133 0 1.562-1.262 2.83-2.825 2.83-1.362 0-2.513-.978-2.775-2.273l-3.838-1.589C3.573 18.922 7.427 22 12.005 22c5.522 0 9.998-4.477 9.998-10 0-5.522-4.477-10-9.999-10zM7.078 16.667c.218.452.595.832 1.094 1.041 1.081.45 2.328-.063 2.777-1.145.22-.525.22-1.1.004-1.625-.215-.525-.625-.934-1.147-1.152-.52-.217-1.075-.208-1.565-.025l1.269.525c.797.333 1.174 1.25.84 2.046-.33.797-1.247 1.175-2.044.843l-1.228-.508zm10.74-7.245c0-1.385-1.128-2.512-2.513-2.512-1.387 0-2.512 1.127-2.512 2.512 0 1.388 1.125 2.513 2.512 2.513 1.386 0 2.512-1.125 2.512-2.513zM15.31 7.53c1.04 0 1.888.845 1.888 1.888s-.847 1.888-1.888 1.888c-1.044 0-1.888-.845-1.888-1.888s.845-1.888 1.888-1.888z" />
				</svg>
			</a>

			{/* Discord */}
			<Tooltip
				className={classes.tooltip}
				title="yunger#3461"
				arrow
				onClick={handleDiscordClick}
			>
				<svg
					className={classes.icon}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<path fill="none" d="M0 0h24v24H0z" />
					<path d="M10.076 11c.6 0 1.086.45 1.075 1 0 .55-.474 1-1.075 1C9.486 13 9 12.55 9 12s.475-1 1.076-1zm3.848 0c.601 0 1.076.45 1.076 1s-.475 1-1.076 1c-.59 0-1.075-.45-1.075-1s.474-1 1.075-1zm4.967-9C20.054 2 21 2.966 21 4.163V23l-2.211-1.995-1.245-1.176-1.317-1.25.546 1.943H5.109C3.946 20.522 3 19.556 3 18.359V4.163C3 2.966 3.946 2 5.109 2H18.89zm-3.97 13.713c2.273-.073 3.148-1.596 3.148-1.596 0-3.381-1.482-6.122-1.482-6.122-1.48-1.133-2.89-1.102-2.89-1.102l-.144.168c1.749.546 2.561 1.334 2.561 1.334a8.263 8.263 0 0 0-3.096-1.008 8.527 8.527 0 0 0-2.077.02c-.062 0-.114.011-.175.021-.36.032-1.235.168-2.335.662-.38.178-.607.305-.607.305s.854-.83 2.705-1.376l-.103-.126s-1.409-.031-2.89 1.103c0 0-1.481 2.74-1.481 6.121 0 0 .864 1.522 3.137 1.596 0 0 .38-.472.69-.871-1.307-.4-1.8-1.24-1.8-1.24s.102.074.287.179c.01.01.02.021.041.031.031.022.062.032.093.053.257.147.514.262.75.357.422.168.926.336 1.513.452a7.06 7.06 0 0 0 2.664.01 6.666 6.666 0 0 0 1.491-.451c.36-.137.761-.337 1.183-.62 0 0-.514.861-1.862 1.25.309.399.68.85.68.85z" />
				</svg>
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
				<Alert severity="success" variant="filled">Copied to clipboard!</Alert>
			</Snackbar>
		</div>
	);
}
