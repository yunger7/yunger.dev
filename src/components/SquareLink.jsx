import React, { useState } from "react";

import { Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { palette } from "../styles/theme";

export const SquareLink = React.forwardRef((props, ref) => {
	const { onClick, href, children, openInNewTab } = props;
	const Icon = props.icon;

	const [elevation, setElevation] = useState(1);

	return (
		<Paper
			component="a"
			href={href}
			onClick={onClick}
			ref={ref}
			target={openInNewTab ? "_blank" : undefined}
			rel={openInNewTab ? "noreferrer" : undefined}
			elevation={elevation}
			onMouseOver={() => setElevation(5)}
			onMouseOut={() => setElevation(1)}
			sx={{
				width: 1,
				height: 1,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				cursor: "pointer",
				transition: theme =>
					theme.transitions.create("all", {
						duration: theme.transitions.duration.short,
					}),
				":hover": {
					bgcolor: theme =>
						theme.palette.mode === "light"
							? theme.palette.background.paper
							: alpha(palette.nord3, 0.75),
				},
			}}
		>
			<Icon sx={{ width: 50, height: 50 }} />
			<Typography variant="button">{children}</Typography>
		</Paper>
	);
});

SquareLink.displayName = "SquareLink";
