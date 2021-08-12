import Link from "next/link";
import {
	AppBar,
	Toolbar,
	Breadcrumbs,
	Link as MuiLink,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import cs from "classnames";

import { Search } from "./Search";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	toolbar: {
		width: "100%",
		maxWidth: theme.breakpoints.values.lg,
		margin: "0 auto",
	},
	breadcrumbs: {
		flexGrow: 1,
	},
	link: {
		padding: "4px 6px",
		fontSize: 14,
		cursor: "pointer",
		borderRadius: theme.shape.borderRadius,
	},
	linkDisabled: {
		cursor: "default",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	linkIcon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	typography: {
		display: "block",
		[theme.breakpoints.down("xs")]: {
			maxWidth: 100,
		},
	},
}));

const defaultPaths = [
	{
		name: "yunger.dev",
		href: "/",
	},
];

export function Navbar({ paths = defaultPaths }) {
	const classes = useStyles();

	return (
		<AppBar className={classes.root} position="sticky" color="inherit">
			<Toolbar className={classes.toolbar}>
				<Breadcrumbs
					className={classes.breadcrumbs}
					maxItems={3}
					aria-label="breadcrumb"
				>
					{paths.length > 1 ? (
						paths.map((path, index) => {
							if (index === paths.length - 1) {
								return (
									<Typography
										noWrap
										className={classes.typography}
										variant="inherit"
										key={path.name}
									>
										<MuiLink
											className={cs(classes.link, classes.linkDisabled)}
											color="inherit"
											aria-current="page"
										>
											{path.name}
										</MuiLink>
									</Typography>
								);
							}

							return (
								<Typography
									noWrap
									className={classes.typography}
									variant="inherit"
									key={path.name}
								>
									<Link href={path.href} passHref>
										<MuiLink className={classes.link} color="inherit">
											{path.name}
										</MuiLink>
									</Link>
								</Typography>
							);
						})
					) : (
						<Typography className={classes.typography} variant="inherit" noWrap>
							<MuiLink
								className={cs(classes.link, classes.linkDisabled)}
								color="inherit"
							>
								yunger.dev
							</MuiLink>
						</Typography>
					)}
				</Breadcrumbs>

				<Search />
			</Toolbar>
		</AppBar>
	);
}
