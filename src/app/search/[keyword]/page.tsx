import { getResultPosts } from "@/api/search"
import FeaturedPosts from "@/components/featuredPosts"

type ResultSlug = {
  params: Promise<{
    keyword: string
  }>
}

export default async function ResultPage({ params }: ResultSlug) {
  const { keyword } = await params
  const result = await getResultPosts(keyword)

  return <FeaturedPosts posts={result} />
}
