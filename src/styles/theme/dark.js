import { createTheme, alpha, darken } from "@mui/material/styles";
import { theme } from "./theme";
import { palette } from "./palette";

export const dark = createTheme(theme, {
	palette: {
		mode: "dark",
		text: {
			primary: palette.nord6,
			secondary: alpha(palette.nord6, 0.7),
			disabled: alpha(palette.nord6, 0.5),
		},
		background: {
			default: darken(palette.nord0, 0.2),
			paper: palette.nord0,
		},
		divider: alpha(palette.nord4, 0.5),
	},
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: alpha(palette.nord3, 0.8),
					},
				},
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
		MuiAccordion: {
			styleOverrides: {
				root: {
					border: `1px solid ${alpha(palette.nord4, 0.1)}`,
					backgroundColor: palette.nord1,
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					backgroundColor: palette.nord2,
				},
				expandIconWrapper: {
					color: palette.nord4,
				},
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					borderTop: `1px solid ${alpha(palette.nord4, 0.15)}`,
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
