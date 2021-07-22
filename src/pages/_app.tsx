import "../styles/globals.css";

import type { AppProps } from "next/app";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { nordDark } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
    <ThemeProvider theme={nordDark}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
