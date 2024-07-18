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

const DUMMY_DATA = [
  {
    id: '1',
    username: 'Exampleuser1',
    repos: [
      {
        id: '1r1',
        title: 'Repository title',
        description: 'Repository description',
        stars: 12,
      },
      {
        id: '1r2',
        title: 'Repository title',
        description: 'Repository description',
        stars: 26,
      },
      {
        id: '1r3',
        title: 'Repository title',
        description: 'Repository description',
        stars: 2,
      },
    ],
  },
  {
    id: '2',
    username: 'Exampleuser2',
    repos: [
      {
        id: '2r1',
        title: 'Repository title',
        description: 'Repository description',
        stars: 13,
      },
    ],
  },
  {
    id: '3',
    username: 'Exampleuser3',
    repos: [],
  },
]

export const Main = () => {
  const [searchText, setSearchText] = useState('')
  const [submittedText, setSubmittedText] = useState('')
  const [expanded, setExpanded] = useState('')

  const onSearchPress = () => {
    setSubmittedText(searchText)
    setSearchText('')
  }

  const renderItem: ListRenderItem<AccordionProps['item']> = ({ item }) => {
    return <Accordion key={item.id} item={item} expanded={expanded} setExpanded={setExpanded} />
  }

  return (
    <View>
      <Input searchText={searchText} setSearchText={setSearchText} />
      <Button text="Search" onPress={onSearchPress} />
      {submittedText && <HelperText text={submittedText} />}
      <FlatList data={DUMMY_DATA} renderItem={renderItem} ListEmptyComponent={EmptyListComponent} />
    </View>
  )
}
