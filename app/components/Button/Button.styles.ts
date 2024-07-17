import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  text: {
    color: Colors.buttonText,
    fontSize: 16,
  },
})
