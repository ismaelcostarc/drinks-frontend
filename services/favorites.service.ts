import type { Drink } from "~/types/drink.types"

export const getFavorites = () => {
  return useCustomFetch<Drink[]>(`/favorites`, { method: "GET" }, true)
}

export const postFavorite = (id: string) => {
  return useCustomFetch<Drink>(`/favorites`, {
    body: {
      drink_id: id
    }, method: "POST"
  }, true)
}

export const deleteFavorite = (id: string) => {
  return useCustomFetch<Drink>(`/favorites/${id}`, { method: "DELETE" }, true)
}