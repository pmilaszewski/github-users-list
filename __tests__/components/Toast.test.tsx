import { render, screen } from '@testing-library/react-native'
import { Toast } from '@/app/components'

const mockedText = 'Ooops! Something went wrong!'

describe('EmptyListComponent', () => {
  it('renders text correctly', () => {
    render(<Toast />)
    const text = screen.getByText(mockedText)

    expect(text).toBeOnTheScreen()
  })
})
