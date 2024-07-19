import { render, screen, userEvent } from '@testing-library/react-native'
import { HelperText, HelperTextProps } from '@/app/components'

const mockedText = 'Test text'
const mockedOnClear = jest.fn()
const mockedFinalText = `Showing users for "${mockedText}"`
const defaultProps: HelperTextProps = {
  text: mockedText,
  onClear: mockedOnClear,
}

describe('HelperText', () => {
  it('renders text correctly', () => {
    render(<HelperText {...defaultProps} />)
    const text = screen.getByText(mockedFinalText)

    expect(text).toBeOnTheScreen()
  })

  it('runs onClear function when press', async () => {
    render(<HelperText {...defaultProps} />)
    const button = screen.getByText('Clear')
    const user = userEvent.setup()

    await user.press(button)

    expect(mockedOnClear).toHaveBeenCalledTimes(1)
  })
})
