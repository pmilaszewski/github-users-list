import { Text } from 'react-native'
import { styles } from './HelperText.styles'

type HelperTextProps = {
  text: string
}

export const HelperText = ({ text }: HelperTextProps) => {
  return <Text style={styles.text}>Showing users for {`"${text}"`}</Text>
}
