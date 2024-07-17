import { TouchableOpacity, Text } from 'react-native'
import { styles } from './Button.styles'

type ButtonProps = {
  text: string
  onPress: () => void
}

export const Button = ({ text, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}
