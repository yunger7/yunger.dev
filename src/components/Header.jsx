import { Box } from "@mui/material";

import { WaveDivider1 } from "./dividers";

function ScrollRedirect({ href }) {
	return <Box id={href} sx={{ position: "relative", bottom: 100 }} />;
}

export function Header(props) {
	const { backgroundImage, dividerColor, children } = props;

	return (
		<Box
			component="section"
			sx={{
				position: "relative",
				minHeight: 500,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ScrollRedirect href="header" />

			<Box
				sx={{
					position: "absolute",
					width: 1,
					height: 1,
					bgcolor: "rgba(25, 25, 25, 0.25)",

					"& img": {
						zIndex: -1,
					},
				}}
			>
				{backgroundImage}
			</Box>

			<Box
				sx={{
					position: "relative",
					bottom: 25,
					width: 700,
					minHeight: 300,
					p: 2.5,
					textAlign: "center",

					backgroundColor: "#eceff41a",
					boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
					backdropFilter: "blur(4px)",
					borderRadius: 2.5,
					border: "1px solid rgba(255, 255, 255, 0.18)",

					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{children}
			</Box>

			<Box
				sx={{
					position: "absolute",
					width: "100%",
					bottom: 0,
				}}
			>
				<WaveDivider1 color={dividerColor ? dividerColor : "#292e39"} />
			</Box>
		</Box>
	);
}
