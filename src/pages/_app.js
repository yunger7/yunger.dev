import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { createEmotionCache } from "../lib/createEmotionCache";
import { dark } from "../styles/theme";

import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
	const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

	return (
		<CacheProvider value={emotionCache}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={dark}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</StyledEngineProvider>
		</CacheProvider>
	);
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
