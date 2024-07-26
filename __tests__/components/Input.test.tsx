import { render, screen, userEvent, waitFor } from '@testing-library/react-native'
import { Input } from '@/app/components'
import { FormProvider, useForm } from 'react-hook-form'

const mockedText = 'Test text'
const mockedSetValue = jest.fn()
const mockedSubmit = jest.fn()

const Component = () => {
  const methods = useForm()
  return (
    <FormProvider {...methods} setValue={mockedSetValue}>
      <Input onSubmit={mockedSubmit} />
    </FormProvider>
  )
}

describe('Input', () => {
  it('changes value correctly', async () => {
    render(<Component />)
    const input = screen.getByTestId('input')
    const user = userEvent.setup()

    await user.type(input, mockedText)

    await waitFor(() => {
      expect(input.props.value).toBe(mockedText)
    })
  })

  it('set value after clicking clear', async () => {
    render(<Component />)
    const input = screen.getByTestId('input')

    const user = userEvent.setup()

    await user.type(input, mockedText)

    const inputClear = screen.getByTestId('input-clear')

    await user.press(inputClear)

    await waitFor(() => {
      expect(mockedSetValue).toHaveBeenCalledTimes(1)
    })
  })
})
