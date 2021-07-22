import Link from "next/link";
import { useRouter } from "next/router";
import _ from "lodash";
import cs from "classnames";
import {
	AppBar,
	Toolbar,
	Breadcrumbs,
	Button,
	Link as MuiLink,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon, Home as HomeIcon } from "@material-ui/icons";

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
    padding: ".1rem .35rem",
    fontSize: 14,
		cursor: "pointer",
    display: "flex",
    alignItems: "flex-end",
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
  searchButton: {
    fontSize: 14,
    padding: ".1rem .5rem",
  },
}));

export function Header() {
	const router = useRouter();
	const classes = useStyles();

	const pathnames = router.pathname.split("/").filter(x => x);

	return (
		<AppBar className={classes.root} position="sticky" color="inherit">
			<Toolbar className={classes.toolbar}>
				<Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
					<Link href="/">
						<MuiLink
							className={cs(classes.link, {
								[classes.linkDisabled]: !pathnames.length,
							})}
							color="inherit"
						>
							<HomeIcon className={classes.linkIcon} />
							yunger.dev
						</MuiLink>
					</Link>
					{pathnames.map((path, index) => {
						const isLast = index === pathnames.length - 1;
						const href = `/${pathnames.slice(0, index + 1).join("/")}`;

						return isLast ? (
							<MuiLink
								className={cs(classes.link, { [classes.linkDisabled]: isLast })}
								color="inherit"
								key={href}
							>
								{_.capitalize(path)}
							</MuiLink>
						) : (
							<Link href={href} key={href}>
								<MuiLink className={classes.link} color="inherit">
									{_.capitalize(path)}
								</MuiLink>
							</Link>
						);
					})}
				</Breadcrumbs>

				<Button className={classes.searchButton} size="small" startIcon={<SearchIcon />} disableRipple>
					Search
				</Button>
			</Toolbar>
		</AppBar>
	);
}
