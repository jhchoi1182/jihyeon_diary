import { getPublicPosts, getPostData } from "@/api/posts"
import DetailPost from "@/components/detailPost"
import { Metadata } from "next"

type Props = {
  params: Promise<{
    filename: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { filename } = await params
  const { title, description } = await getPostData(filename)
  return {
    title,
    description,
  }
}

export default async function Detail({ params }: Props) {
  const { filename } = await params
  const post = await getPostData(filename)
  return (
    <article className="flex justify-center mt-14 mb-36">
      <DetailPost post={post} />
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getPublicPosts()
  return posts.map((post) => ({
    filename: post.path,
  }))
}
