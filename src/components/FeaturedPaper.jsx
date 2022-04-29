import Image from "next/image";
import { forwardRef } from "react";

import { Chip, Typography, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Star as StarIcon } from "@mui/icons-material";

import { palette } from "@styles/theme";
import { RichText } from "./RichText";

import placeholder3 from "public/placeholder3.jpg";

export const FeaturedPaper = forwardRef((props, ref) => {
	const { paper, onClick, href } = props;
	const { title, image, description, createdAt, tags } = paper;

	return (
		<Box
			component="a"
			ref={ref}
			onClick={onClick}
			href={href}
			sx={{
				width: 1,
				minHeight: 400,
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				alignItems: { xs: "stretch", md: "center" },
				gap: theme => theme.spacing(2.5),
				cursor: "pointer",
				transition: theme =>
					theme.transitions.create("background-color", {
						duration: theme.transitions.duration.short,
					}),
				":hover": {
					bgcolor: theme =>
						theme.palette.mode === "light"
							? alpha(palette.nord5, 0.75)
							: alpha(palette.nord3, 0.75),
				},
				"& *": {
					cursor: "pointer",
				},
			}}
		>
			<Box
				sx={{
					position: "relative",
					width: { xs: 1, md: 1 / 2 },
					height: { xs: 200, md: 400 },
					"& img": {
						borderRadius: 1,
					},
				}}
			>
				{image ? (
					<Image
						src={image.src}
						alt="Paper cover"
						layout="fill"
						objectFit="cover"
						placeholder="blur"
						blurDataURL={image.blurDataURL}
					/>
				) : (
					<Image
						src={placeholder3}
						alt="Paper cover"
						layout="fill"
						objectFit="cover"
						placeholder="blur"
					/>
				)}
			</Box>
			<Box
				sx={theme => ({
					width: "50%",
					[theme.breakpoints.down("md")]: {
						width: "100%",
						height: "100%",
					},
				})}
			>
				<Chip
					label="Featured"
					size="small"
					color="primary"
					icon={<StarIcon />}
					sx={{
						mb: 1,
					}}
				/>
				<Typography variant="h5">
					<RichText text={title} />
				</Typography>
				<Typography variant="body2">
					<RichText text={description} />
				</Typography>
				<Typography variant="subtitle2" sx={{ fontFamily: "Inter", mt: 2 }}>
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
			</Box>
		</Box>
	);
});

FeaturedPaper.displayName = "FeaturedPaper";
