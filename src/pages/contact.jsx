import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
	Box,
	Container,
	Typography,
	Grid,
	TextField,
	Snackbar,
	Slide,
	Alert,
	useTheme,
	alpha,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Email as MessageIcon, Send as SendIcon } from "@mui/icons-material";

import { Navbar, Header, Footer } from "../components";

import placeholder3 from "../../public/placeholder3.jpg";

const navbarPaths = [
	{
		name: "yunger.dev",
		href: "/",
	},
	{
		name: "Contact",
		href: "/contact",
	},
];

const schema = yup.object({
	subject: yup.string("Invalid value"),
	name: yup.string("Invalid value"),
	email: yup.string("Invalid value").email("Invalid e-mail"),
	message: yup
		.string("Invalid value")
		.required("This field is required")
		.max(2000, "Your message is too big"),
});

export default function Contact() {
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			subject: "",
			name: "",
			email: "",
			message: "",
		},
		resolver: yupResolver(schema),
	});

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formResponse, setFormResponse] = useState({
		status: "",
		message: "",
	});

	const theme = useTheme();

	async function sendMessage(data) {
		setSnackbarOpen(false);
		setLoading(true);

		try {
			const responseRaw = await fetch("/api/v1/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const { success } = await responseRaw.json();

			if (!success) throw new Error();

			setFormResponse({
				status: "success",
				message: "Message sent successfully!",
			});
			setSnackbarOpen(true);
			setLoading(false);
			reset();
		} catch (error) {
			setFormResponse({
				status: "error",
				message: "Sorry, looks like something went wrong :(",
			});
			setSnackbarOpen(true);
			setLoading(false);
		}
	}

	return (
		<>
			<Head>
				<title>Contact me</title>
			</Head>

			<Navbar paths={navbarPaths} />

			<Header
				backgroundImage={
					<Image
						src={placeholder3}
						alt="Mountain wallpaper"
						layout="fill"
						objectFit="cover"
						placeholder="blur"
					/>
				}
				dividerColor={theme.palette.background.default}
			>
				<MessageIcon sx={{ fontSize: 80 }} />
				<Typography variant="h3" component="h1">
					Send me a message!
				</Typography>
				<Typography variant="body1">
					Want to say hi? Just send a message bellow.
				</Typography>
			</Header>

			<Box component="main">
				<Box sx={{ bgcolor: theme.palette.background.default, pt: 5, pb: 10 }}>
					<Container maxWidth="md">
						<form
							noValidate
							autoComplete="off"
							onSubmit={handleSubmit(sendMessage)}
						>
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<Controller
										name="subject"
										control={control}
										render={({ field, fieldState: { error } }) => (
											<TextField
												{...field}
												fullWidth
												id="subject"
												variant="outlined"
												label="Subject"
												error={Boolean(error)}
												helperText={error?.message}
												autoComplete="off"
											/>
										)}
									/>
								</Grid>
								<Grid item sm={6} xs={12}>
									<Controller
										name="name"
										control={control}
										render={({ field, fieldState: { error } }) => (
											<TextField
												{...field}
												fullWidth
												id="name"
												variant="outlined"
												label="Name"
												error={Boolean(error)}
												helperText={error?.message}
												autoComplete="off"
											/>
										)}
									/>
								</Grid>
								<Grid item sm={6} xs={12}>
									<Controller
										name="email"
										control={control}
										render={({ field, fieldState: { error } }) => (
											<TextField
												{...field}
												fullWidth
												id="email"
												type="email"
												variant="outlined"
												label="Email"
												error={Boolean(error)}
												helperText={error?.message}
												autoComplete="off"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="message"
										control={control}
										render={({ field, fieldState: { error } }) => (
											<TextField
												{...field}
												fullWidth
												multiline
												required
												id="message"
												variant="outlined"
												label="Message"
												rows={5}
												error={Boolean(error)}
												helperText={
													error?.message || `${field.value.length}/2000`
												}
												autoComplete="off"
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sx={theme => ({
										[theme.breakpoints.down("sm")]: {
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										},
									})}
								>
									<LoadingButton
										loading={loading}
										variant="contained"
										color="primary"
										type="submit"
										startIcon={<SendIcon />}
										loadingPosition="start"
										sx={{
											"&.MuiLoadingButton-loading": {
												backgroundColor: theme =>
													alpha(theme.palette.primary.dark, 0.25),
											},
										}}
									>
										{loading ? "Sending..." : "Send message"}
									</LoadingButton>
								</Grid>
							</Grid>
						</form>
						<Snackbar
							anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
							open={snackbarOpen}
							autoHideDuration={3000}
							onClose={() => setSnackbarOpen(false)}
							TransitionComponent={Slide}
						>
							<Alert
								severity={formResponse.status || undefined}
								variant="filled"
							>
								{formResponse.message}
							</Alert>
						</Snackbar>
					</Container>
				</Box>
			</Box>
			<Footer backgroundColor={theme.palette.background.default} />
		</>
	);
}
