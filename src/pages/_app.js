import Head from "next/head";

import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { createEmotionCache } from "../lib/createEmotionCache";
import { dark, light } from "../styles/theme";

import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
	const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={dark}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
