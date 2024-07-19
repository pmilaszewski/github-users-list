import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.buttonText,
    fontSize: 16,
  },
  loader: {
    color: Colors.white,
    justifyContent: 'center',
  },
})
