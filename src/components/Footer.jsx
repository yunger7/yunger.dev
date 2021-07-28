import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { nordPalette } from "../theme";

const useStyles = makeStyles({
  root: {
		height: 300,
		backgroundColor: nordPalette.nord1,
	},
});

export function Footer() {
  const classes = useStyles();

	return (
		<footer className={classes.root}>
			<Container maxWidth="lg">
				<Typography variant="body2">
					This is where the footer is going to be.
				</Typography>
			</Container>
		</footer>
	);
}
