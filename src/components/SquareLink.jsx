import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { nordPalette } from "../theme";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		height: "100%",

		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",

		cursor: "pointer",
		textDecoration: "none",
		transition: "background .2s",

		"&:hover": {
			backgroundColor: `${nordPalette.nord3}aa`,
		},
	},
	icon: {
		width: 50,
		height: 50,
	},
}));

export const SquareLink = React.forwardRef((props, ref) => {
	const classes = useStyles();
	const { onClick, href, children } = props;
	const Icon = props.icon;

	const [elevation, setElevation] = useState(1);

	return (
		<Paper
			className={classes.root}
			component="a"
			href={href}
			onClick={onClick}
			ref={ref}
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
