import type { Drink } from "~/types/drink.type"

export const addFavoriteService = (id: string) => {
  return useCustomFetch<Drink>(`/favorites`, {
    body: {
      drink_id: id
    }, method: "POST"
  }, true)
}