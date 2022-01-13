import { createTheme, alpha, darken } from "@mui/material/styles";
import { palette } from ".";

export const base = createTheme({
	typography: {
		fontFamily: "Rubik, sans-serif",
		fontWeightBold: 600,
		h1: {
			fontSize: "3rem",
			fontWeight: 400,
		},
		h2: {
			fontSize: "2.5rem",
			fontWeight: 400,
		},
		h3: {
			fontSize: "2rem",
		},
		h4: {
			fontSize: "1.75rem",
		},
		h5: {
			fontSize: "1.5rem",
		},
		h6: {
			fontSize: "1.25rem",
		},
		body1: {
			fontFamily: "Inter",
		},
		body2: {
			fontFamily: "Inter",
		},
		button: {
			fontSize: "1rem",
			fontWeight: 400,
			textTransform: "none",
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					flexDirection: "row-reverse",
				},
				expandIconWrapper: {
					marginRight: 8,
				},
			},
		},
		MuiLink: {
			defaultProps: {
				underline: "none",
			},
			styleOverrides: {
				root: {
					transition: "background-color .2s ease-in-out",
					"&:hover": {
						backgroundColor: alpha(palette.nord3, 0.75),
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					"&.MuiPaper-root": {
						backgroundImage: "unset",
					},
				},
			},
		},
	},
});
