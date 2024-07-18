import { Text, View } from 'react-native'
import { styles } from './EmptyListComponent.styles'

type EmptyListComponentProps = {
  text?: string
}

const DEFAULT_TEXT = 'List is empty'

export const EmptyListComponent = ({ text = DEFAULT_TEXT }: EmptyListComponentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}
