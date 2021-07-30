import { notion } from "../../services/notion";

export default function BlogPost({ post }) {
  console.dir(post, { depth: null });

  return (
    <h1>Blog post</h1>
  )
}

const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

export async function getStaticPaths() {
  const response = await notion.databases.query({
    database_id: blogDatabaseId,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  });

  const paths = response.results.map(page => {
    const postSlug = page.properties["Slug"].formula.string;

    return {
      params: { slug: postSlug }
    }
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const response = await notion.databases.query({
    database_id: blogDatabaseId,
    filter: {
      and: [
        {
          property: "Status",
          select: {
            equals: "Published",
          },
        },
        {
          property: "Slug",
          formula: {
            text: { contains: slug },
          },
        },
      ],
    },
    page_size: 1,
  });

  const post = response.results[0];

  return {
    props: { post }
  };
}
