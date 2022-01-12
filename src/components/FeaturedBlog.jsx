import Image from "next/image";
import React from "react";

import { Chip, Typography, Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Star as StarIcon, } from "@mui/icons-material";

import { RichText } from "./RichText";

import { nordPalette } from "../theme";

import placeholder3 from "../../public/placeholder3.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minHeight: 400,

		display: "flex",
		alignItems: "center",
		gap: theme.spacing(2.5),

    cursor: "pointer",
		transition: "background .2s",

		"&:hover": {
			backgroundColor: `${nordPalette.nord3}aa`,
		},

    "& *": {
      cursor: "pointer",
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
  image: {
		position: "relative",
		width: "50%",
		height: 400,
    
    "& img": {
      borderRadius: theme.shape.borderRadius,
    },

    [theme.breakpoints.down('md')]: {
      width: "100%",
      height: 200,
    },
	},
	information: {
    width: "50%",
    [theme.breakpoints.down('md')]: {
      width: "100%",
      height: "50%",
    },
	},
  featuredChip: {
		marginBottom: theme.spacing(1),
	},
	date: {
		fontFamily: "Inter",
		marginTop: theme.spacing(2),
	},
  tags: {
		marginTop: theme.spacing(1),
	},
	tag: {
		marginRight: theme.spacing(1),
	},
}));

export const FeaturedBlog = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const { post, onClick, href } = props;
  const { title, image, description, createdAt, tags } = post;

  return (
    <Box className={classes.root} component="a" ref={ref} onClick={onClick} href={href}>
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
						src={placeholder3}
						alt="Post cover"
						layout="fill"
						objectFit="cover"
						placeholder="blur"
					/>
        )}
      </div>
      <div className={classes.information}>
        <Chip className={classes.featuredChip} icon={<StarIcon />} label="Featured" size="small" color="primary" />
        <Typography variant="h5">
          
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
      </div>
    </Box>
  );
});

FeaturedBlog.displayName = "FeaturedBlog";
