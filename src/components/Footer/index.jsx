import { Box, Container, Typography, Button } from "@mui/material";
import {
	LocalCafe as LocalCafeIcon,
	Favorite as FavoriteIcon,
} from "@mui/icons-material";

import { Links } from "./Links";
import { SocialMedia } from "./SocialMedia";
import { Divider } from "./Divider";

import { palette } from "../../styles/theme";

export default function Footer({ backgroundColor }) {
	return (
		<Box component="footer">
			<Divider backgroundColor={backgroundColor} />
			<Box
				sx={{
					minHeight: 300,
					pt: 2.5,
					pb: 5,
					bgcolor: palette.nord1,
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
						<Box sx={{ color: palette.nord4 }}>
							<Typography variant="body2">
								&copy; 2021 - {new Date().getFullYear()} yunger
							</Typography>
							<Typography variant="body2">
								Build with{" "}
								<FavoriteIcon color="primary" sx={{ fontSize: 14 }} /> and
								JavaScript
							</Typography>
							<Typography variant="body2">v0.1.0 (In development)</Typography>
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
