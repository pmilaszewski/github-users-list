import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { styles } from './Button.styles'

type ButtonProps = {
  text: string
  loading?: boolean
  onPress: () => void
}

export const Button = ({ text, loading, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        {loading ? <ActivityIndicator animating color="#fff" /> : text}
      </Text>
    </TouchableOpacity>
  )
}
