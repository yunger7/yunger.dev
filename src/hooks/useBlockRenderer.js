import {
	Typography,
	Checkbox,
	FormControlLabel,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { RichText } from "../components/RichText";

const useStyles = makeStyles(theme => ({
	accordion: {
		marginBottom: theme.spacing(1),
		boxShadow: "none",
	},
	accordionDetails: {
		display: "block",
		borderTop: `1px solid ${theme.palette.divider}`,
	},
	listItem: {
		listStyle: "none",
		fontSize: 16,
		"&::before": {
			content: '"•"',
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(0.25),
		},
	},
	checkboxFormControlLabel: {
		cursor: "default",
		maxHeight: 30,
	},
	checkbox: {
		"&:hover": {
			backgroundColor: "none",
		},
	},
}));

export function useBlockRenderer(blocks) {
	const classes = useStyles();
	const jsxContent = [];

	for (const block of blocks) {
		const { type, id } = block;
		const value = block[type];

		switch (type) {
			case "paragraph":
				jsxContent.push((
					<Typography paragraph variant="body1" key={id}>
						<RichText text={value.text} />
					</Typography>
				));
				break;
			case "heading_1":
				jsxContent.push((
					<Typography variant="h2" key={id}>
						<RichText text={value.text} />
					</Typography>
				));
				break;
			case "heading_2":
				jsxContent.push((
					<Typography variant="h3" key={id}>
						<RichText text={value.text} />
					</Typography>
				));
				break;
			case "heading_3":
				jsxContent.push((
					<Typography variant="h4" key={id}>
						<RichText text={value.text} />
					</Typography>
				));
				break;
			case "bulleted_list_item":
			case "numbered_list_item":
				jsxContent.push((
					<li className={classes.listItem} key={id}>
						<RichText text={value.text} />
					</li>
				));
				break;
			case "to_do":
				jsxContent.push((
					<div key={id}>
						<FormControlLabel
							className={classes.checkboxFormControlLabel}
							control={
								<Checkbox
									disableRipple
									className={classes.checkbox}
									checked={value.checked}
								/>
							}
							label={<RichText text={value.text} />}
						/>
					</div>
				));
				break;
			case "toggle":
				jsxContent.push((
					<Accordion className={classes.accordion} key={id}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<RichText text={value.text} />
						</AccordionSummary>
						<AccordionDetails className={classes.accordionDetails}>
							{value.children && useBlockRenderer(value.children)}
						</AccordionDetails>
					</Accordion>
				));
				break;
			case "child_page":
				jsxContent.push((
					<p key={id}>{value.title}</p>
				)); // Temp
				break;
			default:
				jsxContent.push((
					<p key={id}>
						<strong>⛔ Unsupported block ⛔</strong>
					</p>
				));
				break;
		}
	}

	return jsxContent;
}
