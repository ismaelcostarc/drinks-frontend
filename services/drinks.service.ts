import type { Drink } from "~/types/drink.types"

export const getDrinksByCategory = (categoryId: string ) => {
  return useCustomFetch<Drink[]>(`/categories/${categoryId}/drinks`, { method: "GET" })
}