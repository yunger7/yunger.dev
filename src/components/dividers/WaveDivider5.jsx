import makeStyles from '@mui/styles/makeStyles';

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

export function WaveDivider5({ color, backgroundColor }) {
	const classes = useStyles({ color, backgroundColor });

	return (
		<svg
			className={classes.root}
			viewBox="0 0 1440 120"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M1440 21.21V120H0V21.21C120 35.07 240 42 360 42s240-6.93 360-20.79c88.328-8.794 154.574-14.333 198.738-16.618A3120.562 3120.562 0 0 1 1080 .42c120 0 240 6.93 360 20.79z"></path>
		</svg>
	);
}
