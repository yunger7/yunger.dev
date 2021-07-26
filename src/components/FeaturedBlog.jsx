import Image from "next/image";

import { Chip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Star as StarIcon, } from "@material-ui/icons";

import { RichText } from "./RichText";

import placeholder3 from "../../public/placeholder3.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: 400,
		display: "flex",
		alignItems: "center",
		gap: theme.spacing(2.5),
  },
  image: {
		position: "relative",
		width: "50%",
		height: "100%",
    "& img": {
      borderRadius: theme.shape.borderRadius,
    }
	},
	information: {
    width: "50%",
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

export function FeaturedBlog({ post }) {
  const classes = useStyles();

  const { coverImageUrl, title, description, createdAt, tags } = post;

  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <Image src={coverImageUrl ? coverImageUrl : placeholder3} alt="" layout="fill" objectFit="cover" />
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
    </div>
  );
}