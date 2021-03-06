import { Box, Container, Typography, Button, lighten } from "@mui/material";
import {
	LocalCafe as LocalCafeIcon,
	Favorite as FavoriteIcon,
} from "@mui/icons-material";

import { websiteConfig } from "website.config";
import { palette } from "@styles/theme";
import { Links } from "./Links";
import { SocialMedia } from "./SocialMedia";
import { Divider } from "./Divider";

export default function Footer({ backgroundColor }) {
	return (
		<Box component="footer">
			<Divider backgroundColor={backgroundColor} />
			<Box
				sx={{
					minHeight: 300,
					pt: 2.5,
					pb: 5,
					bgcolor: theme =>
						theme.palette.mode === "light"
							? lighten(palette.nord6, 0.8)
							: palette.nord1,
				}}
			>
				<Container
					maxWidth="lg"
					sx={theme => ({
						height: 1,
						display: "flex",
						justifyContent: "space-between",
						[theme.breakpoints.down("md")]: {
							flexDirection: "column",
							alignItems: "center",
							gap: theme.spacing(5),
						},
					})}
				>
					<Box
						sx={{
							width: { xs: "65%", sm: "30%", md: "20%" },
							textAlign: { xs: "center", md: "left" },
						}}
					>
						<div>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 500,
									mb: { xs: 2, md: 1.15 },
								}}
							>
								yunger.dev
							</Typography>
							<SocialMedia />
						</div>
						<Box>
							<Typography variant="body2">
								&copy; 2021 - {new Date().getFullYear()} yunger
							</Typography>
							<Typography variant="body2">
								Built with{" "}
								<FavoriteIcon color="primary" sx={{ fontSize: 14 }} /> and
								JavaScript
							</Typography>
							<Typography variant="body2">{websiteConfig.version}</Typography>
						</Box>
						<Button
							variant="outlined"
							color="primary"
							href="https://ko-fi.com/yunger"
							target="_blank"
							rel="noreferrer"
							startIcon={<LocalCafeIcon />}
							sx={{
								mt: 3,
								width: 1,
							}}
						>
							Buy me a coffee
						</Button>
					</Box>
					<Links />
				</Container>
			</Box>
		</Box>
	);
}
