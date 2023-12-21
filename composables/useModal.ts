export const useModal = () => {
  const modalIsVisible = ref(false)
  const closeModal = () => modalIsVisible.value = false
  const showModal = () => modalIsVisible.value = true

  return {
    modalIsVisible,
    closeModal,
    showModal,
  }
}