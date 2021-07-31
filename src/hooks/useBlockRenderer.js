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

export function useBlockRenderer(block) {
	const { type, id } = block;
	const value = block[type];

	const classes = useStyles();

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
				<li className={classes.listItem} key={id}>
					<RichText text={value.text} />
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
						{value.children?.map(block => useBlockRenderer(block))}
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
