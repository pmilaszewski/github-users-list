import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { styles } from './Button.styles'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export type ButtonProps = {
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
      testID="button"
    >
      <Text style={styles.text}>
        {loading ? (
          <ActivityIndicator animating color={Colors.white} testID="button-loader" />
        ) : (
          text
        )}
      </Text>
    </TouchableOpacity>
  )
}
