import { View } from 'react-native'
import { Button, Input } from '@/app/components'

export const Main = () => {
  const onSearchPress = () => {
    console.log('search') // temp
  }

  return (
    <View>
      {/* <Input /> */}
      <Button text="Search" onPress={onSearchPress} />
    </View>
  )
}
