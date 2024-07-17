import { TextInput, View, Text } from 'react-native'
import { styles } from './Input.styles'

// in-progress
export const Input = () => {

  return (
    <View style={styles.container}>
      <TextInput />
      <Text>Test text</Text>
    </View>
  )
}