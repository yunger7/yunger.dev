import { useState } from "react";

import { Button, Dialog, Paper, TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";

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
					InputProps={{
						startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
					}}
				/>
			</Paper>
		</Dialog>
	);
}
