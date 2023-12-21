import type { Drink } from "~/types/drink.type"

export const getDrinksByCategoryService = (categoryId: string ) => {
  return useCustomFetch<Drink[]>(`/category/${categoryId}/drinks`, { method: "GET" })
}