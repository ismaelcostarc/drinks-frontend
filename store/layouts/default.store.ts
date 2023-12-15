import { defineStore } from "pinia"

export const useLayoutsDefaultStore = defineStore('counter', () => {
  const title = ref('')
  const search = ref('')
  const backLink = ref('')

  return { title, search, backLink }
})