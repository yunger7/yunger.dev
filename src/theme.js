import { createTheme, adaptV4Theme } from "@mui/material/styles";

export const nordPalette = {
  nord0: "#2E3440",
  nord1: "#3B4252",
  nord2: "#434C5E",
  nord3: "#4C566A",
  nord4: "#D8DEE9",
  nord5: "#E5E9F0",
  nord6: "#ECEFF4",
  nord7: "#8FBCBB",
  nord8: "#88C0D0",
  nord9: "#81A1C1",
  nord10: "#5E81AC",
  nord11: "#BF616A",
  nord12: "#D08770",
  nord13: "#EBCB8B",
  nord14: "#A3BE8C",
  nord15: "#B48EAD",
};

export const nordDark = createTheme(adaptV4Theme({
  palette: {
    mode: "dark",
    primary: {
      main: nordPalette.nord8,
      dark: "#79b8ca",
      contrastText: nordPalette.nord1,
    },
    secondary: {
      main: nordPalette.nord9,
    },
    error: {
      main: nordPalette.nord11,
    },
    warning: {
      main: nordPalette.nord13,
    },
    info: {
      main: nordPalette.nord9,
    },
    success: {
      main: nordPalette.nord14,
    },
    text: {
      primary: nordPalette.nord6,
      secondary: nordPalette.nord5,
      disabled: nordPalette.nord4,
    },
    background: {
      default: "#242933",
      paper: nordPalette.nord0,
    },
  },
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
  props: {
    MuiButton: {
      disableElevation: true,
    },
    MuiLink: {
      underline: "none",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        padding: "4px 13px",
      },
      startIcon: {
        marginLeft: 0,
        marginRight: 4,
      },
    },
    MuiAccordion: {
      root: {
        backgroundColor: nordPalette.nord1,
      },
    },
    MuiAccordionSummary: {
      root: {
        flexDirection: "row-reverse",
      },
      expandIcon: {
        margin: "0 10px 0 0",
        padding: 0,
      },
    },
    MuiLink: {
      root: {
        transition: "all .2s ease-in-out",
        "&:hover": {
          backgroundColor: `${nordPalette.nord3}cc`,
        },
      },
    },
    MuiTooltip: {
      arrow: {
        "&::before": {
          backgroundColor: nordPalette.nord1,
        },
      },
      tooltip: {
        backgroundColor: nordPalette.nord1,
        color: nordPalette.nord6,
      },  
    },
  },
}));
