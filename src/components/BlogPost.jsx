import Image from "next/image";
import React from "react";

import { Card, CardContent, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { nordPalette } from "../theme";

import { RichText } from "./RichText";

import placeholder1 from "../../public/placeholder1.jpg";

const useStyles = makeStyles(theme => ({
	root: {
		display: "block",
		height: "100%",

		cursor: "pointer",
		transition: "background .2s",

		"&:hover": {
			backgroundColor: `${nordPalette.nord3}aa`,
		},
	},
	image: {
		height: 200,
		position: "relative",
		borderRadius: theme.shape.borderRadius,
	},
	date: {
		marginTop: theme.spacing(1),
		fontFamily: "Inter",
	},
	tags: {
		marginTop: theme.spacing(1),
	},
	tag: {
		marginRight: theme.spacing(1),
	},
}));

export const BlogPost = React.forwardRef((props, ref) => {
	const classes = useStyles();
	const { post, onClick, href } = props;
	const { title, image, description, createdAt, tags } = post;

	return (
		<Card
			className={classes.root}
			component="a"
			ref={ref}
			onClick={onClick}
			href={href}
		>
			<div className={classes.image}>
				{image ? (
					<Image
						src={image.src}
						alt="Post cover"
						layout="fill"
						objectFit="cover"
						placeholder="blur"
						blurDataURL={image.blurDataURL}
					/>
				) : (
					<Image
						src={placeholder1}
						alt="Post cover"
						layout="fill"
						objectFit="cover"
						placeholder="blur"
					/>
				)}
			</div>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					<RichText text={title} />
				</Typography>
				<Typography variant="body2">
					<RichText text={description} />
				</Typography>
				<Typography className={classes.date} variant="subtitle2">
					{new Date(createdAt).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</Typography>
				<div className={classes.tags}>
					{tags.map(({ id, name, color }) => (
						<Chip
							className={classes.tag}
							size="small"
							label={name}
							style={{ backgroundColor: color }}
							key={id}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
});

BlogPost.displayName = "BlogPost";
