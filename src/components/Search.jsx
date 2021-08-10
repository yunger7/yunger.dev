import { useState, useEffect } from "react";

import {
	Button,
	Dialog,
	Paper,
	TextField,
	InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";

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
				startIcon={<SearchIcon />}
				onClick={() => setDialogOpen(true)}
			>
				Search
			</Button>
			<SearchModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
		</>
	);
}

const useModalStyles = makeStyles({
	dialogScrollPaper: {
		alignItems: "flex-start",
	},
	dialogPaper: {
		marginTop: "15vh",
	},
});

function SearchModal(props) {
	const classes = useModalStyles();
	const { dialogOpen, setDialogOpen } = props;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const getResults = async (query) => {
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
  }

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
        const results = await getResults(query, controller);
        setResults(results);
        console.log(results);
      }
    }

    loadResults();

    return () => {
      currentQuery = false;
      controller.abort();
    }

  }, [query]);

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
			<Paper className={classes.paper}>
				<TextField
					autoFocus
					fullWidth
					id="search"
					variant="outlined"
					placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Paper>
		</Dialog>
	);
}
