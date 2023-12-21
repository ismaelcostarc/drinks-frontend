import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import BaseTable from './BaseTable.vue'

describe('BaseTable.vue', () => {
  const MockedBaseButton = {
    template: '<button data-testid="mocked-base-button">Mocked Base Button</button>',
  };

  it('renders headers correctly', async () => {
    const { getByText } = render(BaseTable, {
      props: {
        headers: [
          { title: 'Header1' }, { title: 'Header2' }],
        data: [],
      },
      global: {
        stubs: {
          BaseButton: MockedBaseButton,
        }
      },
    })

    expect(getByText('Header1')).toBeTruthy()
    expect(getByText('Header2')).toBeTruthy()
  })

  it('renders data correctly', async () => {
    const tableData = [
      { id: 1, content: 'Data1' },
      { id: 2, content: 'Data2' },
    ]

    const { getByText } = render(BaseTable, {
      props: {
        headers: ['Header1'],
        data: [tableData],
      },
      global: {
        stubs: {
          BaseButton: MockedBaseButton,
        }
      },
    })

    expect(getByText('Data1')).toBeTruthy()
    expect(getByText('Data2')).toBeTruthy()
  })

  it('highlight the term correctly', () => {
    const highlightTermInWord = (content: string, highlightTerm: string) => {
      const index = content.toLowerCase().indexOf(highlightTerm.toLowerCase())
      if (index !== -1) {
        const start = content.substring(0, index)
        const highlighted = content.substring(index, index + highlightTerm.length)
        const end = content.substring(index + highlightTerm.length)
        return `${start}<span class="highlighted">${highlighted}</span>${end}`
      }
      return content
    }

    const termToHighlight = 'Content'
    const { getAllByText, getAllByTestId } = render(BaseTable, {
      props: {
        headers: ['Header1'],
        data: [
          [{ id: 1, content: 'Content 1', highlightTerm: termToHighlight }],
          [{ id: 2, content: 'Content 2', highlightTerm: termToHighlight }],
        ],
      },
      global: {
        stubs: {
          BaseButton: MockedBaseButton,
        }
      },
    })

    const cells = getAllByTestId(termToHighlight)
    cells.forEach(cell => {
      const htmlContent = cell.innerHTML.toLowerCase()
      expect(htmlContent).toContain(`<span style="font-weight: bolder;">${termToHighlight.toLowerCase()}</span>`)
    })
  })
})
