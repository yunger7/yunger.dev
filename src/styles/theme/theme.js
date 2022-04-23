import {
	createTheme,
	responsiveFontSizes,
	alpha,
	darken,
	lighten,
} from "@mui/material/styles";
import { ArrowForwardIos as ExpandIcon } from "@mui/icons-material";

import { palette } from ".";

export let theme = createTheme({
	palette: {
		primary: {
			light: lighten(palette.nord8, 0.1),
			main: palette.nord8,
			dark: darken(palette.nord8, 0.1),
			contrastText: palette.nord1,
		},
		secondary: {
			light: lighten(palette.nord9, 0.1),
			main: palette.nord9,
			dark: darken(palette.nord9, 0.1),
			contrastText: palette.nord1,
		},
		error: {
			light: lighten(palette.nord11, 0.1),
			main: palette.nord11,
			dark: darken(palette.nord11, 0.1),
			contrastText: palette.nord1,
		},
		warning: {
			light: lighten(palette.nord13, 0.1),
			main: palette.nord13,
			dark: darken(palette.nord13, 0.1),
			contrastText: palette.nord1,
		},
		info: {
			light: lighten(palette.nord15, 0.1),
			main: palette.nord15,
			dark: darken(palette.nord15, 0.1),
			contrastText: palette.nord1,
		},
		success: {
			light: lighten(palette.nord14, 0.1),
			main: palette.nord14,
			dark: darken(palette.nord14, 0.1),
			contrastText: palette.nord1,
		},
	},
	typography: {
		fontFamily: [
			"Inter",
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		fontSize: 14,
		fontWeightBold: 700,
		fontWeightMedium: 500,
		fontWeightRegular: 400,
		fontWeightLight: 300,
		h6: {
			fontFamily: "Inter",
			fontSize: "1.2rem",
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h5: {
			fontFamily: "Inter",
			fontSize: "1.4rem",
			fontWeight: 500,
			lineHeight: 1.5,
		},
		h4: {
			fontFamily: "Inter",
			fontSize: "1.5rem",
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h3: {
			fontFamily: "Inter",
			fontSize: "1.6rem",
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h2: {
			fontFamily: "Rubik",
			fontSize: "1.8rem",
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h1: {
			fontFamily: "Rubik",
			fontSize: "2.7rem",
			fontWeight: 600,
			lineHeight: 1.5,
		},
		subtitle1: {
			fontFamily: "Inter",
			fontWeight: 400,
		},
		subtitle2: {
			fontFamily: "Inter",
			fontSize: "0.9rem",
			lineHeight: 1.6,
		},
		body1: {
			fontFamily: "Inter",
			lineHeight: 1.5,
		},
		body2: {
			fontFamily: "Inter",
			fontSize: "0.9rem",
			lineHeight: 1.45,
		},
		button: {
			fontSize: "1rem",
			fontFamily: "Rubik",
			fontWeight: 400,
			textTransform: "none",
		},
		caption: {
			fontFamily: "Inter",
			lineHeight: 1.5,
		},
		overline: {
			fontFamily: "Inter",
			lineHeight: 2.5,
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiInputBase-root": {
						backgroundColor: palette.nord0,
					},
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiCheckbox: {
			defaultProps: {
				color: "primary",
			},
		},
		MuiRadio: {
			defaultProps: {
				color: "primary",
			},
		},
		MuiTabs: {
			defaultProps: {
				indicatorColor: "primary",
			},
		},
		MuiTab: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiAccordion: {
			defaultProps: {
				disableGutters: true,
				elevation: 0,
			},
			styleOverrides: {
				root: {
					marginTop: "-1px !important",
					"&:before": {
						display: "none",
					},
				},
			},
		},
		MuiAccordionSummary: {
			defaultProps: {
				expandIcon: <ExpandIcon sx={{ fontSize: "0.9rem" }} />,
			},
			styleOverrides: {
				root: {
					flexDirection: "row-reverse",
					"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
						transform: "rotate(90deg)",
					},
				},
			},
		},
		MuiLink: {
			defaultProps: {
				underline: "none",
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
		MuiTooltip: {
			defaultProps: {
				arrow: true,
			},
		},
	},
});

/* Using theme composition to access theme values */
theme = createTheme(theme, {
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					transition: theme.transitions.create("background-color", {
						duration: theme.transitions.duration.shorter,
					}),
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					marginBottom: theme.spacing(2),
					borderRadius: theme.shape.borderRadius,
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					"& .MuiAccordionSummary-content": {
						marginLeft: theme.spacing(1),
					},
				},
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					padding: theme.spacing(2),
				},
			},
		},
	},
});

theme = responsiveFontSizes(theme);
