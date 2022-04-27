import Image from "next/image";

import ImageZoom from "react-medium-image-zoom";

import {
	Box,
	Typography,
	Checkbox,
	FormControlLabel,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	alpha,
} from "@mui/material";

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
					<RichText text={value.text} />
				</Typography>
			);
		case "heading_1":
			return (
				<Typography variant="h3" component="h2" key={id}>
					<RichText text={value.text} />
				</Typography>
			);
		case "heading_2":
			return (
				<Typography variant="h4" component="h3" key={id}>
					<RichText text={value.text} />
				</Typography>
			);
		case "heading_3":
			return (
				<Typography variant="h5" component="h4" key={id}>
					<RichText text={value.text} />
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
					<Box component="span" sx={{ mr: 1 }}>
						•
					</Box>
					<Box component="span">
						<RichText text={value.text} />
					</Box>
				</Box>
			);
		case "to_do":
			return (
				<div key={id}>
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
						label={<RichText text={value.text} />}
						sx={{
							cursor: "default",
							maxHeight: 30,
							":hover": {
								bgcolor: "none",
							},
						}}
					/>
				</div>
			);
		case "toggle":
			return (
				<Accordion key={id}>
					<AccordionSummary>
						<RichText text={value.text} />
					</AccordionSummary>
					<AccordionDetails>
						{value.children && value.children.map(block => renderBlock(block))}
					</AccordionDetails>
				</Accordion>
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
