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

export function WaveDivider2({ color, backgroundColor }) {
  const classes = useStyles({ color, backgroundColor });

	return (
		<svg
			className={classes.root}
			viewBox="0 0 1920 157.327"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M303.719 110.734a3330.42 3330.42 0 0 0 168.09 4.234 3320.491 3320.491 0 0 0 159.313-3.813c135.609-6.535 268.979-21.525 396.41-44.547C1296.81 17.949 1525.27 3.983 1669.51.833c151.12-3.304 243.74 4.253 250.49 4.822v151.672H0v-77.97c12.939 2.334 128.5 22.508 303.719 31.377z"></path>
		</svg>
	);
}
