import type { Drink } from "~/types/drink.type"

export const getFavoritesService = () => {
  return useCustomFetch<Drink[]>(`/favorites`, { method: "GET" }, true)
}