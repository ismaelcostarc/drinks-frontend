import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import BaseInputText from './BaseInputText.vue'

describe('BaseInputText.vue', () => {
  it('renders input correctly with label and placeholder', () => {
    const label = 'Nome'
    const placeholder = 'Insira seu nome'

    const { getByLabelText, getByPlaceholderText } = render(BaseInputText, {
      props: { label, placeholder, modelValue: '' },
    })

    const input = getByPlaceholderText(placeholder)
    expect(input).toBeTruthy()
    expect(input.getAttribute('type')).toBe('text')

    const labelElement = getByLabelText(label)
    expect(labelElement).toBeTruthy()
  })

  it('show indicator of required field correctly', () => {
    const label = 'Nome'
    const placeholder = 'Insira seu nome'

    const { getByText } = render(BaseInputText, {
      props: { label, placeholder, modelValue: '', required: true },
    })

    const requiredIndicator = getByText('*')
    expect(requiredIndicator).toBeTruthy()
    expect(requiredIndicator.className).toBe('base-input-text__required')
  })

  it('updates correctly input value on interacting', async () => {
    const label = 'Nome'
    const placeholder = 'Insira seu nome'

    const { getByPlaceholderText } = render(BaseInputText, {
      props: { label, placeholder, modelValue: '' },
    })

    const input: HTMLInputElement = getByPlaceholderText(placeholder)
    await fireEvent.update(input, 'John Doe')
    expect(input.value).toBe('John Doe')
  })
})
