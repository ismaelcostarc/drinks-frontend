import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'

import BaseTitle from './BaseTitle.vue'

describe('BaseTitle', () => {
  it('renders component with slot', () => {
    const { getByText } = render(BaseTitle, {
      slots: {
        default: 'Test Title',
      },
    })

    expect(getByText('Test Title')).toBeInTheDocument()
  })
})