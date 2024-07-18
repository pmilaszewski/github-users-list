import { StyleSheet, TextStyle } from 'react-native'
import { Colors } from '@/constants/Colors'

const text: TextStyle = {
  fontSize: 16,
  marginVertical: 16,
  fontWeight: 'bold',
}

export const styles = StyleSheet.create({
  text: {
    ...text,
    color: Colors.subtext,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    ...text,
    color: Colors.buttonBackground,
  },
})
