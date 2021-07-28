import { makeStyles } from "@material-ui/core/styles";

import { nordPalette } from "../../theme";

const useStyles = makeStyles({
  root: {
    display: "block",
    bottom: -1,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: ({ backgroundColor }) => {
      return backgroundColor ? backgroundColor : "transparent";
    },
    pointerEvents: "none",
    userSelect: "none",
    verticalAlign: "middle",
    overflow: "hidden",
    fill: ({ color }) => {
      return color ? color : nordPalette.nord0;
    },
    transition: "fill 400ms ease-in-out 0s",
  },
});

export function WaveDivider1({ color, backgroundColor }) {
  const classes = useStyles({ color, backgroundColor });

	return (
		<svg
      className={classes.root}
			viewBox="0 0 1440 47"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M0 .058c117.505 18.386 269.602 22.114 456.294 11.185C562.076 5.051 730.784.911 885.297 3.273 1157.177 7.432 1386.981 21.329 1440 38.39v8.55H0V.058z"></path>
		</svg>
	);
}
