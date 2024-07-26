import { useEffect, useState } from 'react'
import axios from 'axios'
import { headers } from '@/constants/axios'
import { errorCleanupDuration } from '@/constants/durations'

export const GET_USERS_LIST_URL = 'https://api.github.com/search/users'

type User = {
  id: string
  avatar_url: string
  login: string
  repos_url: string
}

type Repo = {
  id: string
  name: string
  description: string
  stargazers_count: number
}

export const useApi = () => {
  const [error, setError] = useState('')

  const getReposForUser = async (url: string) => {
    try {
      const response = await axios.get(url, { headers })

      return response.data
    } catch (e) {
      setError('Error with fetching repos')
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
          resp.data?.items.map(async (item: User) => {
            const repositiories = await getReposForUser(item.repos_url)

            const repos = repositiories?.map((repo: Repo) => ({
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
        setError('Error with fetching users')
        console.warn(e)
        return []
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(''), errorCleanupDuration)
    }
  }, [error])

  return {
    getUserList,
    error,
  }
}
