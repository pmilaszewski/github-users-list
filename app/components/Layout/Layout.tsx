import { View } from 'react-native'
import { styles } from './Layout.styles'

type LayoutProps = {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  return <View style={styles.container}>{children}</View>
}
