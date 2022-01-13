import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import { palette } from "../theme";

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",

		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",

		cursor: "pointer",
		transition: "background .2s",

		"&:hover": {
			backgroundColor: `${palette.nord3}aa`,
		},
	},
	icon: {
		width: 50,
		height: 50,
	},
});

export const SquareLink = React.forwardRef((props, ref) => {
	const classes = useStyles();
	const { onClick, href, children, openInNewTab } = props;
	const Icon = props.icon;

	const [elevation, setElevation] = useState(1);

	return (
		<Paper
			className={classes.root}
			component="a"
			href={href}
			onClick={onClick}
			ref={ref}
			target={openInNewTab ? "_blank" : undefined}
			rel={openInNewTab ? "noreferrer" : undefined}
			elevation={elevation}
			onMouseOver={() => setElevation(5)}
			onMouseOut={() => setElevation(1)}
		>
			<Icon className={classes.icon} />
			<Typography variant="button">{children}</Typography>
		</Paper>
	);
});

SquareLink.displayName = "SquareLink";
