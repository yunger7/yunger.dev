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
		display: "flex",
		margin: `${theme.spacing(1)}px 0`,
	},
	listItemDot: {
		marginRight: theme.spacing(1),
	},
	checkboxFormControlLabel: {
		cursor: "default",
		maxHeight: 30,
		"&:hover": {
			backgroundColor: "none",
		},
	},
	checkbox: {
		cursor: "default",
		"&:hover": {
			backgroundColor: "transparent !important",
		},
	},
}));

export function useBlockRenderer(blocks) {
	const classes = useStyles();
	const jsxContent = [];

	for (const block of blocks) {
		jsxContent.push(renderBlock(block, classes));
	}

	return jsxContent;
}

function renderBlock(block, classes) {
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
		case "bulleted_list_item":
		case "numbered_list_item":
			return (
				<li className={classes.listItem} key={id}>
					<span className={classes.listItemDot}>•</span>
					<span className={classes.listItemContent}>
						<RichText text={value.text} />
					</span>
				</li>
			);
		case "to_do":
			return (
				<div key={id}>
					<FormControlLabel
						className={classes.checkboxFormControlLabel}
						control={
							<Checkbox
								disableRipple
								className={classes.checkbox}
								checked={value.checked}
								classes={{ checked: classes.checkbox }}
							/>
						}
						label={<RichText text={value.text} />}
					/>
				</div>
			);
		case "toggle":
			return (
				<Accordion className={classes.accordion} key={id}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<RichText text={value.text} />
					</AccordionSummary>
					<AccordionDetails className={classes.accordionDetails}>
						{value.children && value.children.map(block => renderBlock(block, classes))}
					</AccordionDetails>
				</Accordion>
			);
		case "child_page":
			return (
				<p key={id}>{value.title}</p>
			); // Temp
		default:
			return (
				<p key={id}>
					<strong>⛔ Unsupported block ⛔</strong>
				</p>
			);
	}
}
