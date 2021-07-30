import { useRouter } from "next/router"

export default function BlogPost() {
  const router = useRouter();

  return (
    <h1>Blog post - {router.query.slug}</h1>
  )
}
