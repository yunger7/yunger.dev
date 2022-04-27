import Image from "next/image";
import { forwardRef } from "react";

import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { palette } from "@styles/theme";
import { RichText } from "./RichText";

import placeholder1 from "public/placeholder1.jpg";

export const BlogPost = forwardRef((props, ref) => {
	const { post, onClick, href } = props;
	const { title, image, description, createdAt, tags } = post;

	return (
		<Card
			component="a"
			ref={ref}
			onClick={onClick}
			href={href}
			sx={{
				display: "block",
				height: 1,
				cursor: "pointer",
				transition: theme =>
					theme.transitions.create("background-color", {
						duration: theme.transitions.duration.short,
					}),
				":hover": {
					bgcolor: theme =>
						theme.palette.mode === "light"
							? alpha(palette.nord6, 0.05)
							: alpha(palette.nord3, 0.75),
				},
			}}
		>
			<Box sx={{ height: 200, position: "relative", borderRadius: 1 }}>
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
			</Box>
			<CardContent>
				<Typography gutterBottom variant="h6">
					<RichText text={title} />
				</Typography>
				<Typography variant="body2">
					<RichText text={description} />
				</Typography>
				<Typography variant="subtitle2" sx={{ fontFamily: "Inter", mt: 1 }}>
					{new Date(createdAt).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</Typography>
				<Box sx={{ mt: 1 }}>
					{tags.map(({ id, name, color }) => (
						<Chip
							size="small"
							label={name}
							key={id}
							sx={{
								mr: 1,
								bgcolor: color,
								color: theme => theme.palette.getContrastText(color),
							}}
						/>
					))}
				</Box>
			</CardContent>
		</Card>
	);
});

BlogPost.displayName = "BlogPost";
