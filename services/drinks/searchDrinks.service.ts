import type { Drink } from "~/types/drink.type"

export const searchDrinksService = (search: string ) => {
  return useCustomFetch<Drink[]>(`/drinks?search=${search}`, { method: "GET" })
}