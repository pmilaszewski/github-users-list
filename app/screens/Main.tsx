import { useState } from 'react'
import { View, FlatList, ListRenderItem } from 'react-native'
import {
  Button,
  Input,
  HelperText,
  Accordion,
  AccordionProps,
  EmptyListComponent,
} from '@/app/components'
import { getUserList } from '@/utils/api'

export const Main = () => {
  const [searchText, setSearchText] = useState('')
  const [submittedText, setSubmittedText] = useState('')
  const [expanded, setExpanded] = useState('')
  const [data, setData] = useState<AccordionProps['item'][]>([])
  const [loading, setLoading] = useState(false)

  const onSearchPress = async () => {
    const result = await getUserList(searchText, setLoading)
    setData(result)
    setSubmittedText(searchText)
    setSearchText('')
  }

  const renderItem: ListRenderItem<AccordionProps['item']> = ({ item }) => {
    return <Accordion key={item.id} item={item} expanded={expanded} setExpanded={setExpanded} />
  }

  const onClearData = () => {
    setData([])
    setSubmittedText('')
  }

  return (
    <View style={{ flex: 1 }}>
      <Input searchText={searchText} setSearchText={setSearchText} />
      <Button text="Search" onPress={onSearchPress} loading={loading} />
      {submittedText && <HelperText text={submittedText} onClear={onClearData} />}
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={EmptyListComponent}
        style={{ paddingRight: 16, marginRight: -16 }}
      />
    </View>
  )
}
