import type { Category } from "~/types/category.types"

export const getCategory = (id: string) => {
  return useCustomFetch<Category>(`/categories/${id}`, { method: "GET" })
}

export const getCategories = () => {
  return useCustomFetch<Category[]>('/categories', { method: "GET" })
}