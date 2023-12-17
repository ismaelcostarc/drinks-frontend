import { defineStore } from "pinia"

export const useLayoutStore = defineStore('counter', () => {
  const title = ref('')
  const search = ref('')
  const backLink = ref('')

  return { title, search, backLink }
})