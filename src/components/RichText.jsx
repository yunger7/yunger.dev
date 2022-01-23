import "react-medium-image-zoom/dist/styles.css";

import Link from "next/link";

import { Box, Link as MuiLink } from "@mui/material";

import { getNordColor } from "../utils";
import { palette } from "../styles/theme";

export function RichText({ text: richText }) {
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
				<Box
					component="span"
					sx={[
						color !== "default" && {
							color: getNordColor(color),
						},
						bold && {
							fontWeight: "bold",
						},
						code && {
							fontFamily: "monospace",
							borderRadius: 1,
							py: 0.05,
							px: 0.75,
							bgcolor: theme =>
								theme.palette.mode === "light" ? palette.nord6 : palette.nord1,
							color: "primary.main",
						},
						italic && {
							fontStyle: "italic",
						},
						underline && {
							textDecoration: "underline",
						},
						strikethrough && {
							textDecoration: "line-through",
						},
					]}
					key={index}
				>
					{text.link ? (
						<>
							{text.link.url.includes("yunger.dev") ? (
								<Link passHref href={cleanUrl(text.link.url)}>
									<MuiLink>{text.content}</MuiLink>
								</Link>
							) : (
								<MuiLink href={text.link.url} target="_blank" rel="noreferrer">
									{text.content}
								</MuiLink>
							)}
						</>
					) : (
						text.content
					)}
				</Box>
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

function cleanUrl(url) {
	return url
		.replace("http://", "")
		.replace("https://", "")
		.replace("www.", "")
		.replace("yunger.dev", "");
}
