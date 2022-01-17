import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import {
	Box,
	Container,
	Typography,
	Grid,
	TextField,
	Button,
	Snackbar,
	Slide,
	CircularProgress,
	Alert,
} from "@mui/material";
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

export default function Contact() {
	const [subject, setSubject] = useState({ value: "", error: false });
	const [name, setName] = useState({ value: "", error: false });
	const [email, setEmail] = useState({ value: "", error: false });
	const [message, setMessage] = useState({ value: "", error: false });
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formResponse, setFormResponse] = useState({
		status: "",
		message: "",
	});

	async function handleSubmit(event) {
		event.preventDefault();

		setSubject({ ...subject, error: false });
		setName({ ...name, error: false });
		setEmail({ ...email, error: false });
		setMessage({ ...message, error: false });
		resetFormResponse();
		setSnackbarOpen(false);

		if (!subject.value) {
			setSubject({ ...subject, error: "This field is required" });
			return;
		}

		if (!message.value) {
			setMessage({ ...message, error: "This field is required" });
			return;
		}

		if (email.value) {
			const emailRegEx =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (!emailRegEx.test(email.value)) {
				setEmail({ ...email, error: "Invalid email" });
				return;
			}
		}

		setLoading(true);

		try {
			const responseRaw = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					subject: subject.value,
					name: name.value,
					email: email.value,
					message: message.value,
				}),
			});

			const data = await responseRaw.json();

			if (data.error) {
				setFormResponse({
					status: "error",
					message: "Sorry! Looks like something went wrong.",
				});
				setSnackbarOpen(true);
				setLoading(false);

				return;
			}

			setFormResponse({
				status: "success",
				message: "Message sent successfully!",
			});
			setSnackbarOpen(true);
			setLoading(false);
		} catch (error) {
			setFormResponse({
				status: "error",
				message: "Sorry! Looks like something went wrong.",
			});
			setSnackbarOpen(true);
			setLoading(false);
		}
	}

	function resetFormResponse() {
		setFormResponse({
			status: "",
			message: "",
		});
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
				dividerColor="#292e39"
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
				<Box sx={{ bgcolor: "#292e39", pt: 5, pb: 10 }}>
					<Container maxWidth="md">
						<form noValidate autoComplete="off" onSubmit={handleSubmit}>
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<TextField
										fullWidth
										required
										id="subject"
										variant="outlined"
										label="Subject"
										value={subject.value}
										error={!!subject.error}
										helperText={subject.error}
										onChange={event =>
											setSubject({ ...subject, value: event.target.value })
										}
										autoComplete="off"
									/>
								</Grid>
								<Grid item sm={6} xs={12}>
									<TextField
										fullWidth
										id="name"
										variant="outlined"
										label="Name"
										value={name.value}
										error={!!name.error}
										helperText={name.error}
										onChange={event =>
											setName({ ...name, value: event.target.value })
										}
										autoComplete="off"
									/>
								</Grid>
								<Grid item sm={6} xs={12}>
									<TextField
										fullWidth
										id="email"
										type="email"
										variant="outlined"
										label="Email"
										value={email.value}
										error={!!email.error}
										helperText={email.error}
										onChange={event =>
											setEmail({ ...email, value: event.target.value })
										}
										autoComplete="off"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										multiline
										required
										id="message"
										variant="outlined"
										label="Message"
										rows={5}
										value={message.value}
										error={!!message.error}
										helperText={message.error}
										onChange={event =>
											setMessage({ ...message, value: event.target.value })
										}
										autoComplete="off"
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
									{loading ? (
										<Button
											disableRipple
											disabled
											type="submit"
											variant="contained"
											color="primary"
											startIcon={
												<CircularProgress
													color="primary"
													sx={{ mr: 0.5 }}
													size={20}
												/>
											}
										>
											Sending message
										</Button>
									) : (
										<Button
											disableRipple
											type="submit"
											variant="contained"
											color="primary"
											startIcon={<SendIcon />}
										>
											Send message
										</Button>
									)}
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
			<Footer backgroundColor="#292e39" />
		</>
	);
}
