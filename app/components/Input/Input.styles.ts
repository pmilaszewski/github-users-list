import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

export const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
})
