import { useState } from 'react'
import { View } from 'react-native'
import { Button, Input, HelperText } from '@/app/components'

export const Main = () => {
  const [searchText, setSearchText] = useState('')
  const [submittedText, setSubmittedText] = useState('')

  const onSearchPress = () => {
    setSubmittedText(searchText)
    setSearchText('')
  }

  return (
    <View>
      <Input searchText={searchText} setSearchText={setSearchText} />
      <Button text="Search" onPress={onSearchPress} />
      {submittedText && <HelperText text={submittedText} />}
    </View>
  )
}
