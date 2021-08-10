import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  searchButton: {
		fontSize: 14,
		padding: ".1rem .5rem",
	},
})

export function Search() {
  const classes = useStyles();

  return (
    <Button
      className={classes.searchButton}
      size="small"
      startIcon={<SearchIcon />}
      disableRipple
    >
      Search
    </Button>
  );
}
