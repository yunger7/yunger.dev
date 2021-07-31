import Head from "next/head";
import Link from "next/link";

import { Container, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

import { getBlogPosts } from "../../lib/getBlogPosts";
import { nordPalette } from "../../theme";

import { Header } from "../../components/Header"
import { FeaturedBlog } from "../../components/FeaturedBlog";
import { BlogPost } from "../../components/BlogPost";
import { WaveDivider1 } from "../../components/dividers/WaveDivider1";
import { WaveDivider4 } from "../../components/dividers/WaveDivider4";
import { Footer } from "../../components/Footer";

const headerPaths = [
  {
    name: "yunger.dev",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

const carouselProps = {
	navButtonsAlwaysInvisible: true,
	indicatorIconButtonProps: {
		style: {
			color: nordPalette.nord1,
			"&:hover": {
				backgroundColor: nordPalette.nord1,
			},
			"&:active": {
				backgroundColor: nordPalette.nord1,
			},
		},
	},
	activeIndicatorIconButtonProps: {
		style: {
			color: nordPalette.nord9,
		},
	},
};

const useStyles = makeStyles(theme => ({
  page: {
    paddingTop: theme.spacing(6),
  },
  featured: {
    paddingBottom: theme.spacing(5),
  },
  latest: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(10),
    backgroundColor: "#292e39",
  },
}));

export default function Blog({ posts }) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Blog | yunger.dev</title>
      </Head>

      <Header paths={headerPaths} />

      <main className={classes.page}>
        <section className={classes.featured}>
          <Container maxWidth="lg">
            {!!posts.featured.length && (
							<Carousel {...carouselProps}>
								{posts.featured.map(post => (
									<Link href={`/blog/${post.slug}`} passHref key={post.id}>
										<FeaturedBlog post={post} />
									</Link>
								))}
							</Carousel>
						)}
          </Container>
        </section>

        <WaveDivider1 color="#292e39" />

        <section className={classes.latest}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {posts.latest.map(post => (
                <Grid item md={4} sm={6} xs={12} key={post.id}>
                  <Link href={`/blog/${post.slug}`} passHref>
                    <BlogPost post={post} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
      </main>

      <WaveDivider4 backgroundColor="#292e39" />

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getBlogPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 8 // 8 hours
  };
}
