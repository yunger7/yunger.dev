import makeStyles from '@mui/styles/makeStyles';

import { WaveDivider1 } from "../components/dividers/WaveDivider1";

const useStyles = makeStyles(theme => ({
	scroll: {
		position: "relative",
		bottom: 100,
	},
	root: {
		position: "relative",
		minHeight: 500,

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	mask: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(25, 25, 25, 0.25)",

		"& img": {
			zIndex: -1,
		}
	},
	card: {
		position: "relative",
		bottom: 25,
		minHeight: 300,
		width: 700,
		padding: theme.spacing(2.5),
		textAlign: "center",

		backgroundColor: "#eceff41a",
		boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
		backdropFilter: "blur(4px)",
		borderRadius: 10,
		border: "1px solid rgba(255, 255, 255, 0.18)",

		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	divider: {
		position: "absolute",
		width: "100%",
		bottom: 0,
	},
}));

export function Header(props) {
	const { backgroundImage, dividerColor, children } = props;
	const classes = useStyles();

	return (
		<section className={classes.root}>
			<div id="header" className={classes.scroll} />

			<div className={classes.mask}>
				{backgroundImage}
			</div>

			<div className={classes.card}>
				{children}
			</div>

			<div className={classes.divider}>
				<WaveDivider1 color={dividerColor ? dividerColor : "#292e39"} />
			</div>
		</section>
	);
}
