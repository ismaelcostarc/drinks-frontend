import type { Category } from "~/types/category.type"

export const getCategoriesService = () => {
  return useCustomFetch<Category[]>('/categories', { method: "GET" })
}