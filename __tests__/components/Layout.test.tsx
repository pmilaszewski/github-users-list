import { render, screen } from '@testing-library/react-native'
import { View } from 'react-native'
import { Layout } from '@/app/components'

const mockedChildren = <View testID="mocked-view" />

describe('Layout', () => {
  it('renders children correctly', () => {
    render(<Layout>{mockedChildren}</Layout>)
    const children = screen.getByTestId('mocked-view')

    expect(children).toBeOnTheScreen()
  })
})
