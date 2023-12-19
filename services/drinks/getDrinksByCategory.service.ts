import type { Drink } from "~/types/drink.type"

export const getDrinksByCategoryService = (categoryId: string ) => {
  return useCustomFetch<Drink[]>(`/categories/${categoryId}/drinks`, { method: "GET" })
}