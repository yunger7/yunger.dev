import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import {
	Container,
	Card,
	CardContent,
	Typography,
	Grid,
	TextField,
	Button,
  Snackbar,
  Slide,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Email as MessageIcon, Send as SendIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { Header } from "../components/Header";
import { WaveDivider1 } from "../components/dividers/WaveDivider1";
import { WaveDivider4 } from "../components/dividers/WaveDivider4";
import { Footer } from "../components/Footer";

import placeholder3 from "../../public/placeholder3.jpg";

const headerPaths = [
	{
		name: "yunger.dev",
		href: "/",
	},
	{
		name: "Contact",
		href: "/contact",
	},
];

const useStyles = makeStyles(theme => ({
	page: {
		paddingTop: theme.spacing(6),
	},
	introduction: {
		paddingBottom: theme.spacing(5),
	},
	introductionWallpaper: {
		position: "relative",
		width: "100%",
		height: 250,
	},
	introductionCardContent: {
		padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
		maxHeight: 125,
		display: "flex",
	},
	messageIcon: {
		fontSize: 160,
		position: "relative",
		bottom: 75,
		marginRight: theme.spacing(2.5),
	},
	form: {
		backgroundColor: "#282e39",
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(10),
	},
}));

export default function Contact() {
	const classes = useStyles();

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
      const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

			<Header paths={headerPaths} />

			<main className={classes.page}>
				<section className={classes.introduction}>
					<Container maxWidth="lg">
						<Card>
							<div className={classes.introductionWallpaper}>
								<Image
									src={placeholder3}
									alt=""
									layout="fill"
									objectFit="cover"
									placeholder="blur"
								/>
							</div>
							<CardContent className={classes.introductionCardContent}>
								<MessageIcon className={classes.messageIcon} />
								<div>
									<Typography variant="h5" component="h1">
										Send me a message!
									</Typography>
									<Typography variant="body1">
										Want to say hi? Just send a message bellow.
									</Typography>
								</div>
							</CardContent>
						</Card>
					</Container>
				</section>

				<WaveDivider1 color="#292e39" />

				<section className={classes.form}>
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
								<Grid item xs={6}>
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
								<Grid item xs={6}>
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
								<Grid item xs={4}>
									{loading ? (
                    <Button
                      disableRipple
                      disabled
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<CircularProgress color="primary" style={{ marginRight: 6 }} size={20} />}
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
              <Alert severity={formResponse.status} variant="filled">{formResponse.message}</Alert>
            </Snackbar>
					</Container>
				</section>
			</main>

			<WaveDivider4 backgroundColor="#292e39" />

			<Footer />
		</>
	);
}
