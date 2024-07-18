import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 4,
    height: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 12,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
  icon: {
    color: Colors.icon,
  },
  itemContainer: {
    marginLeft: 16,
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: Colors.repoItemBackground,
  },
  itemTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 12,
    marginTop: 8,
  },
  itemListHelperContainer: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
  },
})
