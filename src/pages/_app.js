import "../styles/globals.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { dark } from "../theme";

export default function App({ Component, pageProps }) {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={dark}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</StyledEngineProvider>
	);
}
