import { MaterialIcons } from '@expo/vector-icons'
import { TextInput, Pressable } from 'react-native'
import { styles } from './Input.styles'

type InputProps = {
  searchText: string
  setSearchText: (value: string) => void
}

const INPUT_PLACEHOLDER = 'Enter username'

export const Input = ({ searchText, setSearchText }: InputProps) => {
  const onClearText = () => setSearchText('')

  return (
    <>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder={INPUT_PLACEHOLDER}
        style={styles.input}
      />
      {searchText && (
        <Pressable onPress={onClearText} style={styles.iconContainer}>
          <MaterialIcons name="clear" size={16} style={styles.icon} />
        </Pressable>
      )}
    </>
  )
}
