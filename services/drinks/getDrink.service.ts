import type { Drink } from "~/types/drink.type"

export const getDrinkService = (id: string ) => {
  return useCustomFetch<Drink>(`/drinks/${id}`, { method: "GET" })
}