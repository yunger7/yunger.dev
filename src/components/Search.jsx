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
import makeStyles from "@mui/styles/makeStyles";
import {
	Search as SearchIcon,
	Description as PostIcon,
	Language as WebpageIcon,
} from "@mui/icons-material";

import { sleep } from "../utils/sleep";

const useStyles = makeStyles({
	searchButton: {
		fontSize: 14,
		padding: ".1rem .5rem",
	},
});

export function Search() {
	const classes = useStyles();
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<Button
				disableRipple
				className={classes.searchButton}
				size="small"
				color="inherit"
				startIcon={<SearchIcon />}
				onClick={() => setDialogOpen(true)}
			>
				Search
			</Button>
			<SearchModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
		</>
	);
}

const useModalStyles = makeStyles(theme => ({
	dialogScrollPaper: {
		alignItems: "flex-start",
	},
	dialogPaper: {
		marginTop: "15vh",
	},
	results: {
		maxHeight: 200,
		overflow: "auto",
	},
	resultIcon: {
		marginRight: theme.spacing(1),
	},
	noResults: {
		height: 200,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	noResultsTitle: {
		marginBottom: theme.spacing(0.75),
	},
	noResultsSubtitle: {
		filter: "brightness(0.8)",
	},
}));

function SearchModal(props) {
	const classes = useModalStyles();
	const { dialogOpen, setDialogOpen } = props;

	const [query, setQuery] = useState("");
	const [isFirstSearch, setIsFirstSearch] = useState(true);
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const getResults = async query => {
		const responseRaw = await fetch("/api/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
			}),
		});

		const data = await responseRaw.json();
		return data;
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
			classes={{
				scrollPaper: classes.dialogScrollPaper,
				paper: classes.dialogPaper,
			}}
		>
			<TextField
				autoFocus
				fullWidth
				id="search"
				variant="outlined"
				placeholder="Search"
				value={query}
				onChange={e => setQuery(e.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{loading ? <CircularProgress size={24} /> : <SearchIcon />}
						</InputAdornment>
					),
				}}
			/>
			{!isFirstSearch && (
				<>
					{results.length ? (
						<List className={classes.results}>
							{results.map(result => (
								<Link passHref href={result.href} key={result.id}>
									<ListItem button disableRipple component="a">
										{result.pageType === "webpage" && (
											<WebpageIcon className={classes.resultIcon} />
										)}
										{result.pageType === "post" && (
											<PostIcon className={classes.resultIcon} />
										)}
										<Typography noWrap variant="inherit">
											{result.title}
										</Typography>
									</ListItem>
								</Link>
							))}
						</List>
					) : (
						<Paper className={classes.noResults}>
							<Typography className={classes.noResultsTitle} variant="body1">
								No results found
							</Typography>
							<Typography className={classes.noResultsSubtitle} variant="body2">
								Try different search terms
							</Typography>
						</Paper>
					)}
				</>
			)}
		</Dialog>
	);
}
