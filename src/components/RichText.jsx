import Link from "next/link";
import cs from "classnames";

import { Link as MuiLink } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getNordColor } from "../utils/getNordColor";

const useStyles = makeStyles({
	bold: {
		fontWeight: "bold",
	},
	code: {
		fontFamily: "monospace"
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
});

export function RichText({ text }) {
	if (!text) {
		return null;
	}

	const classes = useStyles();

	return text.map((value, index) => {
		const {
			annotations: { bold, code, color, italic, strikethrough, underline },
			text,
		} = value;
		return (
			<span
        className={cs(
          {[classes.bold]: bold},
          {[classes.code]: code},
          {[classes.italic]: italic},
          {[classes.strikethrough]: strikethrough},
          {[classes.underline]: underline}
        )}
				style={color !== "default" ? { color: getNordColor(color) } : {}}
        key={index}
			>
				{text.link ? (
					<Link href={text.link.url} passHref>
						<MuiLink>{text.content}</MuiLink>
					</Link>
				) : (
					text.content
				)}
			</span>
		);
	});
}