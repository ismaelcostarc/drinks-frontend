import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseForm from './BaseForm.vue'

describe('BaseForm.vue', () => {
  it('renders form correclty', () => {
    const { container } = render(BaseForm)

    const formElement = container.querySelector('.base-form')
    expect(formElement).toBeTruthy()
  })
})
