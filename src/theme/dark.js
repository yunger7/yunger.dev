import { createTheme, alpha } from "@mui/material/styles";
import { palette, base } from ".";

export const dark = createTheme(base, {
	palette: {
		mode: "dark",
		primary: {
			main: palette.nord8,
			dark: "#79b8ca",
			contrastText: palette.nord1,
		},
		secondary: {
			main: palette.nord9,
		},
		error: {
			main: palette.nord11,
		},
		warning: {
			main: palette.nord13,
		},
		info: {
			main: palette.nord9,
		},
		success: {
			main: palette.nord14,
		},
		text: {
			primary: palette.nord6,
			secondary: palette.nord5,
			disabled: palette.nord4,
		},
		background: {
			default: "#242933",
			paper: palette.nord0,
		},
		divider: alpha(palette.nord4, 0.25),
	},
	components: {
		MuiAccordion: {
			styleOverrides: {
				root: {
					backgroundColor: palette.nord1,
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				expandIconWrapper: {
					color: palette.nord4,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				colorDefault: palette.nord0,
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: palette.nord3,
					color: palette.nord6,
				},
				arrow: {
					"&::before": {
						backgroundColor: palette.nord3,
					},
				},
			},
		},
	},
});
