import type { Drink } from "~/types/drink.types"

export const getDrinksByCategory = (payload: { categoryId: string }) => {
  return useCustomFetch<Drink[]>(`/categories/${payload.categoryId}/drinks`, { method: "GET" })
}