import Link from "next/link";

import {
	AppBar,
	Toolbar,
	Breadcrumbs,
	Link as MuiLink,
	Typography,
} from "@mui/material";

import { Search } from ".";

const defaultPaths = [
	{
		name: "yunger.dev",
		href: "/",
	},
];

export function Navbar({ paths = defaultPaths }) {
	return (
		<AppBar position="sticky" color="inherit" sx={{ flexGrow: 1 }}>
			<Toolbar
				sx={{
					width: 1,
					maxWidth: theme => theme.breakpoints.values.lg,
					mx: "auto",
					my: 0,
				}}
			>
				<Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
					{paths.length > 1 ? (
						paths.map((path, index) => {
							if (index === paths.length - 1) {
								return (
									<Typography
										noWrap
										variant="inherit"
										key={path.name}
										sx={theme => ({
											display: "block",
											[theme.breakpoints.down("sm")]: {
												maxWidth: 100,
											},
										})}
									>
										<MuiLink
											color="inherit"
											aria-current="page"
											sx={{
												py: 0.5,
												px: 0.75,
												fontSize: 14,
												borderRadius: 1,
												cursor: "default",
												":hover": {
													bgcolor: "transparent",
												},
											}}
										>
											{path.name}
										</MuiLink>
									</Typography>
								);
							}

							return (
								<Typography
									noWrap
									variant="inherit"
									key={path.name}
									sx={theme => ({
										display: "block",
										[theme.breakpoints.down("sm")]: {
											maxWidth: 100,
										},
									})}
								>
									<Link passHref href={path.href}>
										<MuiLink
											color="inherit"
											sx={{
												py: 0.5,
												px: 0.75,
												fontSize: 14,
												cursor: "pointer",
												borderRadius: 1,
											}}
										>
											{path.name}
										</MuiLink>
									</Link>
								</Typography>
							);
						})
					) : (
						<Typography
							noWrap
							variant="inherit"
							sx={theme => ({
								display: "block",
								[theme.breakpoints.down("sm")]: {
									maxWidth: 100,
								},
							})}
						>
							<MuiLink
								color="inherit"
								sx={{
									py: 0.5,
									px: 0.75,
									fontSize: 14,
									borderRadius: 1,
									cursor: "default",
									":hover": {
										bgcolor: "transparent",
									},
								}}
							>
								yunger.dev
							</MuiLink>
						</Typography>
					)}
				</Breadcrumbs>

				<Search />
			</Toolbar>
		</AppBar>
	);
}
