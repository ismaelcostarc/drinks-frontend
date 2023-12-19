import type { Category } from "~/types/category.type"

export const getCategoryService = (id: string) => {
  return useCustomFetch<Category>(`/categories/${id}`, { method: "GET" })
}