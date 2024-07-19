import axios from 'axios'
import { headers } from '@/constants/axios'

export const GET_USERS_LIST_URL = 'https://api.github.com/search/users'

export const useApi = () => {
  const getReposForUser = async (url: string) => {
    try {
      const response = await axios.get(url, { headers })

      return response.data
    } catch (e) {
      console.warn(e)
      return []
    }
  }

  const getUserList = async (q: string, setLoading: (value: boolean) => void) => {
    setLoading(true)
    return axios
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
              imageUrl: item.avatar_url,
              repos,
            }
          }),
        )
        return users
      })
      .catch((e) => {
        console.warn(e)
        return []
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    getUserList,
  }
}
