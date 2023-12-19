import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import BaseModal from './BaseModal.vue'
import BaseCard from '@/components/base/card/BaseCard.vue'

describe('BaseModal.vue', () => {
  it('renders correctly with slots', async () => {
    const { getByText } = render(BaseModal, {
      slots: {
        header: 'Header do Modal',
        default: 'Conteúdo do Modal',
        footer: 'Footer do Modal',
      },
      global: {
        components: { BaseCard }, 
      },
    })

    const header = getByText('Header do Modal')
    const content = getByText('Conteúdo do Modal')
    const footer = getByText('Footer do Modal')

    expect(header).toBeTruthy()
    expect(content).toBeTruthy()
    expect(footer).toBeTruthy()
  })

  it('renders correctly without slots', async () => {
    const { queryByText } = render(BaseModal, {
      global: {
        components: { BaseCard },
      },
    })

    const header = queryByText('Header do Modal')
    const content = queryByText('Conteúdo do Modal')
    const footer = queryByText('Footer do Modal')

    expect(header).toBeNull()
    expect(content).toBeNull()
    expect(footer).toBeNull()
  })
})
