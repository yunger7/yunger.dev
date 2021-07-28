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

export function WaveDivider3({ color, backgroundColor }) {
  const classes = useStyles({ color, backgroundColor });

	return (
		<svg
      className={classes.root}
			viewBox="0 0 2000 242"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M2000 75.463c-230.631 73.429-431.99 108.499-604.064 105.196-293.434-5.632-485.998-145.823-954.537-150.568C272.956 28.385 125.825 50.689 0 96.996V242h2000V75.463z"></path>
		</svg>
	);
}
