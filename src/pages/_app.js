import "../styles/globals.css";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { nordDark } from "../theme";

export default function App({ Component, pageProps }) {
	return (
    <ThemeProvider theme={nordDark}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
