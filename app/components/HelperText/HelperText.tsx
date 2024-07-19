import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from './HelperText.styles'

export type HelperTextProps = {
  text: string
  onClear: () => void
}

export const HelperText = ({ text, onClear }: HelperTextProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Showing users for {`"${text}"`}</Text>
      <TouchableOpacity style={styles.clearButton} onPress={onClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  )
}
