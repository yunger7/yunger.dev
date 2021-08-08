import Link from "next/link";
import cs from "classnames";

import { Link as MuiLink } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getNordColor } from "../utils/getNordColor";
import { nordPalette } from "../theme";

const useStyles = makeStyles(theme => ({
	bold: {
		fontWeight: "bold",
	},
	code: {
		fontFamily: "monospace",
		borderRadius: 2,
		padding: `${theme.spacing(0.05)}px ${theme.spacing(0.75)}px`,
		backgroundColor: nordPalette.nord1,
		color: theme.palette.primary.main,
	},
	italic: {
		fontStyle: "italic",
	},
	strikethrough: {
		textDecoration: "line-through",
	},
	underline: {
		textDecoration: "underline",
	},
}));

export function RichText({ text: richText }) {
	const classes = useStyles();

	if (!richText) {
		return null;
	}

	return richText.map((value, index) => {
		const {
			annotations: { bold, code, color, italic, strikethrough, underline },
			text,
			mention,
		} = value;

		if (text) {
			return (
				<span
					className={cs(
						{ [classes.bold]: bold },
						{ [classes.code]: code },
						{ [classes.italic]: italic },
						{ [classes.strikethrough]: strikethrough },
						{ [classes.underline]: underline }
					)}
					style={color !== "default" ? { color: getNordColor(color) } : {}}
					key={index}
				>
					{text.link ? (
						<Link href={text.link.url} passHref>
							<MuiLink target="_blank" rel="noreferrer">{text.content}</MuiLink>
						</Link>
					) : (
						text.content
					)}
				</span>
			);
		}

		if (mention) {
			const { date } = mention;

			if (date) {
				if (date.end) {
					return (
						<span key={index}>
							{new Date(date.end).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
							})}{" "}
							→{" "}
							{new Date(date.start).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
							})}
						</span>
					);
				} else {
					return (
						<span key={index}>
							{new Date(date.start).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
							})}
						</span>
					);
				}
			}
		}
	});
}
