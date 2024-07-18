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
import axios from 'axios'
import { headers } from '@/constants/axios'

const GET_USERS_LIST_URL = 'https://api.github.com/search/users'

export const Main = () => {
  const [searchText, setSearchText] = useState('')
  const [submittedText, setSubmittedText] = useState('')
  const [expanded, setExpanded] = useState('')
  const [data, setData] = useState<AccordionProps['item'][]>([])
  const [loading, setLoading] = useState(false)

  const getReposForUser = async (url: string) => {
    try {
      const response = await axios.get(url, { headers })

      return response.data
    } catch (e) {
      console.warn(e)
      return []
    }
  }

  const getUserList = async (q: string) => {
    setLoading(true)
    axios
      .get(GET_USERS_LIST_URL, {
        params: {
          q,
          per_page: 5,
        },
        headers,
      })
      .then(async (resp) => {
        const users = await Promise.all(
          // item should be typed, cannot find proper types in github api docs
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resp.data?.items.map(async (item: any) => {
            const repositiories = await getReposForUser(item.repos_url)

            // repo should be typed, cannot find proper types in github api docs
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const repos = repositiories?.map((repo: any) => ({
              id: repo.id,
              title: repo.name ?? 'No title',
              description: repo.description ?? 'No description',
              stars: repo.stargazers_count ?? 0,
            }))

            return {
              id: item.id,
              username: item.login,
              repos,
            }
          }),
        )
        setData([...users])
      })
      .catch(console.warn)
      .finally(() => {
        setLoading(false)
      })
  }

  const onSearchPress = async () => {
    await getUserList(searchText)
    setSubmittedText(searchText)
    setSearchText('')
  }

  const renderItem: ListRenderItem<AccordionProps['item']> = ({ item }) => {
    return <Accordion key={item.id} item={item} expanded={expanded} setExpanded={setExpanded} />
  }

  return (
    <View style={{ flex: 1 }}>
      <Input searchText={searchText} setSearchText={setSearchText} />
      <Button text="Search" onPress={onSearchPress} loading={loading} />
      {submittedText && <HelperText text={submittedText} />}
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={EmptyListComponent}
        style={{ paddingRight: 16, marginRight: -16 }}
      />
    </View>
  )
}
