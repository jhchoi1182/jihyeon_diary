"use client"

import { useContext, useEffect, useState } from "react"
import PostCard from "./PostCard"
import { Post } from "@/api/posts"
import { CategoryContext } from "@/context/CategoryContext"
import { PostsProps } from "."

export default function PostsContainer({ posts }: PostsProps) {
  const { selectedCategory } = useContext(CategoryContext)
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")

  useEffect(() => {
    const savedSortOrder = sessionStorage.getItem("postSortOrder")
    if (savedSortOrder === "asc" || savedSortOrder === "desc") {
      setSortOrder(savedSortOrder)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem("postSortOrder", sortOrder)
  }, [sortOrder])

  const filteredPosts =
    selectedCategory === "ALL"
      ? posts
      : posts.filter((post) => post.categories.includes(selectedCategory))

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    if (dateA === dateB) {
      return a.title.localeCompare(b.title)
    }

    return sortOrder === "desc" ? dateB - dateA : dateA - dateB
  })

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")}
          className="p-2 border border-gray-200 rounded bg-white text-black dark:bg-lightDark dark:text-gray-100 dark:border-gray-600"
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
      </div>
      <ul className="grid gap-4 grid-cols-3 xl:grid-cols-2 md:!grid-cols-1">
        {sortedPosts.map((post) => (
          <li key={post.path}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
