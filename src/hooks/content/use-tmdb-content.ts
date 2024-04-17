import { useQuery } from '@tanstack/react-query'
import { get } from '../../lib/axios'
import { TMDB } from './types'
import { env } from '../../env'

export const useTMDBContent = () => {
  const fetchTMDBList: () => Promise<TMDB> = async () => {
    return await get(`${env.VITE_API_URL}3/movie/top_rated?api_key=${env.VITE_API_KEY}&language=en_US&page=1`)
  }

  const { data } = useQuery({
    queryFn: fetchTMDBList,
    queryKey: ["fetchTMDBList"],
  })

  return { contents: data?.results }
}
