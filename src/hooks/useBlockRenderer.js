import Image from "next/image";

import ImageZoom from "react-medium-image-zoom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

import {
	Box,
	Paper,
	Typography,
	Checkbox,
	FormControlLabel,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";

import { getSyntaxHighlightingLanguage } from "@lib/getSyntaxHighlightingLanguage";
import { RichText } from "@components";

export function useBlockRenderer(blocks) {
	const jsxContent = [];

	for (const block of blocks) {
		jsxContent.push(renderBlock(block));
	}

	return jsxContent;
}

function renderBlock(block) {
	const { type, id } = block;
	const value = block[type];

	switch (type) {
		case "paragraph":
			return (
				<Typography paragraph variant="body1" key={id}>
					<RichText text={value.rich_text} />
				</Typography>
			);
		case "heading_1":
			return (
				<Typography variant="h3" component="h2" key={id} sx={{ mt: 5 }}>
					<RichText text={value.rich_text} />
				</Typography>
			);
		case "heading_2":
			return (
				<Typography variant="h4" component="h3" key={id} sx={{ mt: 4 }}>
					<RichText text={value.rich_text} />
				</Typography>
			);
		case "heading_3":
			return (
				<Typography variant="h5" component="h4" key={id} sx={{ mt: 3 }}>
					<RichText text={value.rich_text} />
				</Typography>
			);
		case "image":
			if (!value.external) {
				return null;
			}

			if (!value.external.url) {
				return null;
			}

			return (
				<ImageZoom
					overlayBgColorStart="rgba(0, 0, 0, 0.5)"
					overlayBgColorEnd="rgba(0, 0, 0, 0.5)"
					wrapStyle={{ width: "100%" }}
					key={id}
				>
					<Box sx={{ position: "relative", height: 500, width: 1 }}>
						<Image
							src={value.external.url}
							alt=""
							layout="fill"
							objectFit="contain"
						/>
					</Box>
				</ImageZoom>
			);
		case "bulleted_list_item":
		case "numbered_list_item":
			return (
				<Box
					component="li"
					key={id}
					sx={{
						listStyle: "none",
						fontSize: 16,
						display: "flex",
						my: 1,
						mx: 0,
					}}
				>
					<Box component="span" sx={{ mr: 1, ml: 0.5 }}>
						•
					</Box>
					<Box component="span">
						<RichText text={value.rich_text} />
					</Box>
				</Box>
			);
		case "to_do":
			return (
				<Box key={id} sx={{ my: 0.5, mx: 0 }}>
					<FormControlLabel
						control={
							<Checkbox
								disableRipple
								checked={value.checked}
								sx={{
									cursor: "default",
									":hover": {
										bgcolor: "transparent !important",
									},
								}}
							/>
						}
						label={<RichText text={value.rich_text} />}
						sx={{
							cursor: "default",
							maxHeight: 30,
							":hover": {
								bgcolor: "none",
							},
						}}
					/>
				</Box>
			);
		case "toggle":
			return (
				<Accordion key={id}>
					<AccordionSummary>
						<RichText text={value.rich_text} />
					</AccordionSummary>
					<AccordionDetails>
						{value.children && value.children.map(block => renderBlock(block))}
					</AccordionDetails>
				</Accordion>
			);
		case "code":
			const codeStr = value.rich_text
				.map(({ plain_text }) => plain_text)
				.join("");

			return (
				<Paper elevation={4} key={id}>
					<SyntaxHighlighter
						showLineNumbers
						language={getSyntaxHighlightingLanguage(value.language)}
						style={nord}
					>
						{codeStr}
					</SyntaxHighlighter>
				</Paper>
			);
		case "child_page":
			return <p key={id}>{value.title}</p>; // Temp
		default:
			return (
				<p key={id}>
					<strong>⛔ Unsupported block ⛔</strong>
				</p>
			);
	}
}
