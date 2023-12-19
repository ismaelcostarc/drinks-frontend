import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import BaseInputSearch from './BaseInputSearch.vue'

describe('BaseInputSearch.vue', () => {
  const MockedBaseForm = {
    template: '<form data-testid="mocked-base-form"><slot /></form>',
  };

  it('renders input correctly with placeholder', async () => {
    const placeholderText = 'Pesquisar'

    const { getByPlaceholderText } = render(BaseInputSearch, {
      props: { placeholder: placeholderText },
      global: {
        stubs: {
          BaseForm: MockedBaseForm,
        }
      },
    })

    const input = getByPlaceholderText(placeholderText)
    expect(input).toBeTruthy()
  })

  it('renders disabled search button', async () => {
    const { getByTestId } = render(BaseInputSearch, {
      global: {
        stubs: {
          BaseForm: MockedBaseForm,
        }
      },
    })

    const button = getByTestId('search-button')

    expect(button).toBeTruthy()
    expect(button.attributes).toHaveProperty('disabled')
  })

  it('enable button on inserting text on input', async () => {
    const placeholderText = 'Pesquisar'

    const { getByPlaceholderText, getByTestId } = render(BaseInputSearch, {
      props: { placeholder: placeholderText },
      global: {
        stubs: {
          BaseForm: MockedBaseForm,
        }
      },
    })

    const input = getByPlaceholderText(placeholderText)
    const button = getByTestId('search-button')

    await fireEvent.update(input, 'Search query')
    expect(button.attributes).not.toHaveProperty('disabled')
  })

  it('emits search event on button click with input filled', async () => {
    const placeholderText = 'Pesquisar'

    const { getByPlaceholderText, getByTestId, emitted } = render(BaseInputSearch, {
      props: { placeholder: placeholderText },
      global: {
        stubs: {
          BaseForm: MockedBaseForm,
        }
      },
    })

    const input = getByPlaceholderText(placeholderText)

    await fireEvent.update(input, 'Search query')
    await fireEvent.submit(input)

    expect(emitted().search).toBeTruthy()
  })
})
