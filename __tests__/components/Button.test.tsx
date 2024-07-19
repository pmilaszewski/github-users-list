import { render, screen, userEvent } from '@testing-library/react-native'
import { Button, ButtonProps } from '@/app/components'
import { useFormContext } from 'react-hook-form'

jest.mock('react-hook-form')
const mockedUseFormContext = useFormContext as jest.Mock

const mockedText = 'Test text'
const mockedOnPress = jest.fn()

const defaultProps: ButtonProps = {
  text: mockedText,
  onPress: mockedOnPress,
}

describe('Button', () => {
  beforeEach(() => {
    mockedUseFormContext.mockImplementation(() => ({
      formState: { isValid: true },
    }))
  })

  it('renders text and not renders loader when loading = false', () => {
    render(<Button {...defaultProps} />)

    const text = screen.getByText(mockedText)
    const loader = screen.queryByTestId('button-loader')

    expect(text).toBeOnTheScreen()
    expect(loader).not.toBeOnTheScreen()
  })

  it('renders loader and not render text when loading = true', () => {
    render(<Button {...defaultProps} loading />)

    const text = screen.queryByText(mockedText)
    const loader = screen.getByTestId('button-loader')

    expect(text).not.toBeOnTheScreen()
    expect(loader).toBeOnTheScreen()
  })

  it('runs onPress function when press', async () => {
    render(<Button {...defaultProps} />)
    const user = userEvent.setup()
    const button = screen.getByTestId('button')

    await user.press(button)

    expect(mockedOnPress).toHaveBeenCalledTimes(1)
  })

  it('button should be disabled when isValid = false', async () => {
    mockedUseFormContext.mockImplementationOnce(() => ({
      formState: { isValid: false },
    }))
    render(<Button {...defaultProps} />)
    const button = screen.getByTestId('button')

    expect(button).toBeDisabled()
  })
})
