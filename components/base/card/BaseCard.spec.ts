import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseCard from './BaseCard.vue'

describe('BaseCard.vue', () => {
  it('renders default size correctly', () => {
    const { container } = render(BaseCard)
    const baseCardElement = container.querySelector('.base-card')

    expect(baseCardElement?.className).toContain('medium')
  })

  it('renders different sizes correctly', () => {
    const { container } = render(BaseCard, {
      props: {
        size: 'small',
      },
    })

    const baseCardElement = container.querySelector('.base-card')

    expect(baseCardElement?.className).toContain('small')
  })

  it('renders with full width correctly', () => {
    const { container } = render(BaseCard, {
      props: {
        size: 'full',
      },
    })

    const baseCardElement = container.querySelector('.base-card')

    expect(baseCardElement?.className).toContain('full')
  })

  it('renders slots correctly', () => {
    const { getByText } = render(BaseCard, {
      slots: {
        default: '<span>Content</span>',
        header: '<h2>Header</h2>',
        footer: '<footer>Footer</footer>',
      },
    })

    expect(getByText('Content')).toBeTruthy()
    expect(getByText('Header')).toBeTruthy()
    expect(getByText('Footer')).toBeTruthy()
  })
})
