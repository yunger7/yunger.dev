import Head from "next/head";
import Image from "next/image";

import { Container, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Email as MessageIcon } from "@material-ui/icons";

import { Header } from "../components/Header";

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
  introduction: {},
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
}))

export default function Contact() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Contact me</title>
      </Head>

      <Header paths={headerPaths} />

      <main className={classes.page}>
        <div className={classes.introduction}>
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
        </div>
      </main>
    </>
  )
}