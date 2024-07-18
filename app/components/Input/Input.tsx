import { MaterialIcons } from '@expo/vector-icons'
import { useFormContext, Controller } from 'react-hook-form'
import { TextInput, Pressable } from 'react-native'
import { styles } from './Input.styles'

const INPUT_PLACEHOLDER = 'Enter username'

export const Input = () => {
  const { setValue, watch, control } = useFormContext()

  const onClearText = () => setValue('searchText', '', { shouldValidate: true })

  const searchText = watch('searchText')

  return (
    <>
      <Controller
        name="searchText"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={INPUT_PLACEHOLDER}
              style={styles.input}
            />
            {searchText && (
              <Pressable onPress={onClearText} style={styles.iconContainer}>
                <MaterialIcons name="clear" size={16} style={styles.icon} />
              </Pressable>
            )}
          </>
        )}
      />
    </>
  )
}
