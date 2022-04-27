import { createTheme, alpha, darken, lighten } from "@mui/material/styles";
import { palette, theme } from ".";

export const light = createTheme(theme, {
	palette: {
		mode: "light",
		text: {
			primary: palette.nord3,
			secondary: alpha(palette.nord3, 0.7),
			disabled: alpha(palette.nord3, 0.5),
		},
		background: {
			default: lighten(palette.nord6, 0.2),
			paper: "#ffffff",
		},
		divider: alpha(palette.nord4, 0.8),
	},
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: alpha(palette.nord6, 0.45),
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiInputBase-root": {
						backgroundColor: theme.palette.common.white,
					},
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					border: `1px solid ${alpha(palette.nord3, 0.1)}`,
					backgroundColor: palette.nord6,
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					backgroundColor: lighten(palette.nord6, 0.4),
				},
				expandIconWrapper: {
					color: palette.nord0,
				},
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					borderTop: `1px solid ${alpha(palette.nord3, 0.15)}`,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				colorDefault: palette.nord6,
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: palette.nord5,
					color: palette.nord0,
				},
				arrow: {
					"&::before": {
						backgroundColor: palette.nord5,
					},
				},
			},
		},
	},
});
