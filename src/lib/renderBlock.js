import { Fragment } from "react";
import {
	Typography,
	Checkbox,
	FormControlLabel,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@material-ui/core";

import { RichText } from "../components/RichText";

export function renderBlock(block) {
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
				<Typography variant="h2" key={id}>
					<RichText text={value.text} />
				</Typography>
			);
		case "heading_2":
			return (
				<Typography variant="h3" key={id}>
					<RichText text={value.text} />
				</Typography>
			);
		case "heading_3":
			return (
				<Typography variant="h4" key={id}>
					<RichText text={value.text} />
				</Typography>
			);
		case "bulleted_list_item":
		case "numbered_list_item":
			return (
				<li key={id}>
					<RichText text={value.text} />
				</li>
			);
		case "to_do":
			return (
				<div key={id}>
					<FormControlLabel
						control={<Checkbox checked={value.checked} />}
						label={<RichText text={value.text} />}
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
						{value.children?.map(block => renderBlock(block))}
					</AccordionDetails>
				</Accordion>
			);
		case "child_page":
			return <p key={id}>{value.title}</p>; // Temp
		default:
			return <p key={id}><strong>⛔ Unsupported block ⛔</strong></p>
	}

}
