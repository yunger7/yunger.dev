import Link from "next/link";
import { Grid, Typography, Box, alpha } from "@mui/material";
import {
	Home as HomeIcon,
	Info as InfoIcon,
	HistoryEdu as PaperIcon,
	Settings as SettingsIcon,
} from "@mui/icons-material";

import { palette } from "@styles/theme";

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
				name: "Latest papers",
				href: "/#papers",
			},
			{
				name: "More",
				href: "/#more",
			},
		],
	},
	{
		title: {
			name: "Papers",
			href: "/papers",
			icon: <PaperIcon />,
		},
		links: [
			{
				name: "Featured",
				href: "/papers/#featured",
			},
			{
				name: "Latest",
				href: "/papers/#latest",
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
				name: "Progretion",
				href: "https://progretion.com/",
			},
			{
				name: "Animelist",
				href: "/animelist",
			},
			{
				name: "Tools",
				href: "/tools",
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
				name: "About",
				href: "/about",
			},
			{
				name: "Work website",
				href: "https://luisgalete.com.br/",
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

export function Links() {
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
					transition: theme =>
						theme.transitions.create("all", {
							duration: theme.transitions.duration.shorter,
						}),
					color: theme => theme.palette.text.secondary,
					":hover": {
						color: theme => theme.palette.text.primary,
					},
				}}
			>
				{link.name}
			</Typography>
		);
	};

	return (
		<Grid
			container
			sx={{ justifyContent: { xs: "space-between", md: "flex-end" } }}
		>
			{footerLinks.map(({ title, links }, index) => (
				<Grid
					item
					sm={2}
					xs={12}
					key={index}
					sx={{
						textAlign: { xs: "center", sm: "left" },
						mb: { xs: 2.5, sm: 0 },
					}}
				>
					<Box
						sx={{
							mb: 2,
							borderBottom: theme => `1px solid ${theme.palette.divider}`,
						}}
					>
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
			))}
		</Grid>
	);
}
