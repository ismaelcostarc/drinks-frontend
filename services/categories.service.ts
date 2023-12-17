import type { Category } from "~/types/category.types"

export const getCategories = () => {
  return useCustomFetch<Category[]>('/categories', { method: "GET" })
}