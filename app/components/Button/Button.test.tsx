import { render, screen, userEvent } from '@testing-library/react-native'
import { Button } from './Button'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    formState: () => ({
      isValid: true,
    }),
  }),
}))

const text = 'Test text'

describe('Button', () => {
  it('show loader when loading = true', () => {
    render(<Button onPress={jest.fn} text={text} loading />)

    const loader = screen.getByTestId('button-loader')
    expect(loader).toBeOnTheScreen()
  })
})
