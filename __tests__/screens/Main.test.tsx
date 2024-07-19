import { render, screen, userEvent, waitFor } from '@testing-library/react-native'
import { Main } from '@/app/screens'
import { useForm, FormProvider } from 'react-hook-form'
import { mockedData } from '@/mocks/data'

const mockedText = 'Test text'
const mockedSetValue = jest.fn()
const mockedHandleSubmit = jest.fn()

jest.mock('@/utils/api', () => ({
  useApi: () => ({
    getUserList: jest.fn().mockResolvedValue(mockedData),
  }),
}))

const Component = () => {
  const methods = useForm()
  return (
    <FormProvider {...methods} setValue={mockedSetValue} handleSubmit={mockedHandleSubmit}>
      <Main />
    </FormProvider>
  )
}

describe('Main', () => {
  it('renders empty list component', () => {
    render(<Component />)

    const empty = screen.getByText('List is empty')

    expect(empty).toBeOnTheScreen()
  })

  it('renders list after set input value and clicking search', async () => {
    render(<Component />)
    const user = userEvent.setup()
    const input = screen.getByTestId('input')
    const button = screen.getByTestId('button')

    await user.type(input, mockedText)
    await user.press(button)

    await waitFor(() => {
      const users = screen.getAllByTestId('accordion-username')
      const item1 = screen.getByTestId(`accordion-repo-title-1r1`)
      const item2 = screen.getByTestId(`accordion-repo-title-2r1`)

      expect(users.length).toBe(3)
      expect(item1).toBeOnTheScreen()
      expect(item2).toBeOnTheScreen()
    })
  })
})
