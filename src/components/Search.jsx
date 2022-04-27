import Link from "next/link";
import { useState, useEffect } from "react";

import {
	Button,
	Dialog,
	Paper,
	TextField,
	InputAdornment,
	List,
	ListItem,
	Typography,
	CircularProgress,
} from "@mui/material";
import {
	Search as SearchIcon,
	Description as PostIcon,
	Language as WebpageIcon,
} from "@mui/icons-material";

import { sleep } from "@utils";

export function Search() {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<Button
				disableRipple
				size="small"
				color="inherit"
				startIcon={<SearchIcon />}
				onClick={() => setDialogOpen(true)}
				sx={{
					fontSize: 14,
					px: 1,
					py: 0.25,
				}}
			>
				Search
			</Button>
			<SearchModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
		</>
	);
}
function SearchModal(props) {
	const { dialogOpen, setDialogOpen } = props;

	const [query, setQuery] = useState("");
	const [isFirstSearch, setIsFirstSearch] = useState(true);
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const getResults = async query => {
		const responseRaw = await fetch("/api/v1/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
			}),
		});

		const { data } = await responseRaw.json();
		return data || [];
	};

	useEffect(() => {
		let currentQuery = true;
		const controller = new AbortController();

		const loadResults = async () => {
			if (!query) {
				setResults([]);
				return;
			}

			await sleep(500);

			if (currentQuery) {
				setLoading(true);
				const results = await getResults(query, controller);
				setResults(results);

				setIsFirstSearch(false);
				setLoading(false);
				console.log(results);
			}
		};

		loadResults();

		return () => {
			currentQuery = false;
			controller.abort();
		};
	}, [query]);

	useEffect(() => {
		setIsFirstSearch(true);
		setQuery("");
		setLoading(false);
		setResults([]);
	}, [dialogOpen]);

	return (
		<Dialog
			fullWidth
			onClose={() => setDialogOpen(false)}
			open={dialogOpen}
			maxWidth="xs"
			sx={{
				"& .MuiDialog-scrollPaper": {
					alignItems: "flex-start",
				},
				"& .MuiDialog-paper": {
					mt: "15vh",
				},
			}}
		>
			<TextField
				autoFocus
				fullWidth
				id="search"
				variant="outlined"
				placeholder="Search"
				autoComplete="off"
				value={query}
				onChange={e => setQuery(e.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{loading ? (
								<CircularProgress size={24} />
							) : (
								<SearchIcon sx={{ color: "text.primary" }} />
							)}
						</InputAdornment>
					),
				}}
			/>
			{!isFirstSearch && (
				<>
					{results.length ? (
						<List sx={{ maxHeight: 200, overflow: "auto" }}>
							{results.map(result => (
								<Link passHref href={result.href} key={result.id}>
									<ListItem button disableRipple component="a">
										{result.pageType === "webpage" && (
											<WebpageIcon sx={{ mr: 1 }} />
										)}
										{result.pageType === "post" && <PostIcon sx={{ mr: 1 }} />}
										<Typography noWrap variant="inherit">
											{result.title}
										</Typography>
									</ListItem>
								</Link>
							))}
						</List>
					) : (
						<Paper
							sx={{
								height: 200,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								variant="body1"
								sx={{
									mb: 0.75,
								}}
							>
								No results found
							</Typography>
							<Typography variant="body2" sx={{ filter: "brightness(0.8)" }}>
								Try different search terms
							</Typography>
						</Paper>
					)}
				</>
			)}
		</Dialog>
	);
}
