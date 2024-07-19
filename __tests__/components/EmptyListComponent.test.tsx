import { render, screen } from '@testing-library/react-native'
import { EmptyListComponent } from '@/app/components'

const mockedText = 'Test text'

describe('EmptyListComponent', () => {
  it('renders text correctly', () => {
    render(<EmptyListComponent text={mockedText} />)
    const text = screen.getByText(mockedText)

    expect(text).toBeOnTheScreen()
  })
})
