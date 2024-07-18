import { useState } from 'react'
import { View, FlatList, ListRenderItem } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import {
  Button,
  Input,
  HelperText,
  Accordion,
  AccordionProps,
  EmptyListComponent,
} from '@/app/components'
import { getUserList } from '@/utils/api'

type Input = {
  searchText: string
}

export const Main = () => {
  const [submittedText, setSubmittedText] = useState('')
  const [expanded, setExpanded] = useState('')
  const [data, setData] = useState<AccordionProps['item'][]>([])
  const [loading, setLoading] = useState(false)

  const methods = useForm<Input>()
  const { setValue, handleSubmit } = methods

  const onSearchPress = async ({ searchText }: { searchText: string }) => {
    const result = await getUserList(searchText, setLoading)
    setData(result)
    setSubmittedText(searchText)
    setValue('searchText', '', { shouldValidate: true })
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
      <FormProvider {...methods}>
        <Input />
        <Button text="Search" onPress={handleSubmit(onSearchPress)} loading={loading} />
        {submittedText && <HelperText text={submittedText} onClear={onClearData} />}
        <FlatList
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={EmptyListComponent}
          style={{ paddingRight: 16, marginRight: -16 }}
        />
      </FormProvider>
    </View>
  )
}
