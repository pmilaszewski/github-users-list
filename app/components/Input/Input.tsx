import { TextInput } from 'react-native'
import { styles } from './Input.styles'

type InputProps = {
  searchText: string
  setSearchText: (value: string) => void
}

const INPUT_PLACEHOLDER = 'Enter username'

export const Input = ({ searchText, setSearchText }: InputProps) => {
  return (
    <TextInput
      value={searchText}
      onChangeText={setSearchText}
      placeholder={INPUT_PLACEHOLDER}
      style={styles.input}
    />
  )
}
