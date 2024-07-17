import { View, Text } from 'react-native'
import { Button } from '@/app/components'

export const Main = () => {
  const onSearchPress = () => {
    console.log('search') // temp
  }

  return (
    <View>
      <Text>Main screen here we go</Text>
      <Button text="Search" onPress={onSearchPress} />
    </View>
  )
}
