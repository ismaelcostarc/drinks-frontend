import type { Drink } from "~/types/drink.type"

export const removeFavoriteService = (id: string) => {
  return useCustomFetch<Drink>(`/favorites/${id}`, { method: "DELETE" }, true)
}