import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { styles } from './Button.styles'

type ButtonProps = {
  text: string
  loading?: boolean
  onPress: () => void
}

export const Button = ({ text, loading, onPress }: ButtonProps) => {
  const {
    formState: { isValid },
  } = useFormContext()

  return (
    <TouchableOpacity
      style={[styles.container, { opacity: !isValid ? 0.5 : 1 }]}
      onPress={onPress}
      disabled={!isValid}
    >
      <Text style={styles.text}>
        {loading ? <ActivityIndicator animating color="#fff" testID="button-loader" /> : text}
      </Text>
    </TouchableOpacity>
  )
}
