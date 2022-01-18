import { createTheme, alpha, darken, lighten } from "@mui/material/styles";
import { palette, theme } from ".";

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
		MuiAccordion: {
			styleOverrides: {
				root: {
					border: `1px solid ${alpha(palette.nord4, 0.15)}`,
					backgroundColor: palette.nord1,
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					backgroundColor: palette.nord2,
					"& .MuiAccordionSummary-content": {
						marginLeft: theme.spacing(1),
					},
				},
				expandIconWrapper: {
					color: palette.nord4,
				},
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					padding: theme.spacing(2),
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
