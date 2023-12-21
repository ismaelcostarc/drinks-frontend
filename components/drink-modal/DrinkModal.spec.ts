
import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import DrinkModal from './DrinkModal.vue'

describe('DrinkModal.vue', () => {
  const MockedBaseModal = {
    template: `<div>
      <slot name="title"/>
      <slot />
      <slot name="footer"/>
    </div>`
  }

  const MockedBaseButton = {
    template: `<button><slot /></button>`
  }

  const MockedBaseTitle = {
    template: `<h1><slot /></h1>`
  }

  const drink = {
    name: 'Mocked Drink',
    img_url: 'mocked_image_url',
    description: 'Mocked Description',
  }

  const stubs = {
    BaseTitle: MockedBaseTitle,
    BaseButton: MockedBaseButton,
    BaseModal: MockedBaseModal,
  }

  it('renders modal content correctly', () => {
    const { getByText, getByAltText } = render(DrinkModal, {
      props: {
        drink,
      },
      global: {
        stubs
      }
    })

    expect(getByAltText(drink.name)).toBeTruthy()
    expect(getByText(drink.description)).toBeTruthy()
  })

  it('emits close event when close button is clicked', async () => {
    const { emitted, getByText } = render(DrinkModal, {
      props: {
        drink
      },
      global: {
        stubs: {
          BaseTitle: MockedBaseTitle,
          BaseButton: MockedBaseButton,
          BaseModal: MockedBaseModal,
        }
      }
    })

    const closeButton = getByText('Fechar')
    await fireEvent.click(closeButton)

    expect(emitted().close).toBeTruthy()
  })
})
