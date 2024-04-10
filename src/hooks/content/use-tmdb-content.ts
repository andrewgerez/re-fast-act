import { useQuery } from '@tanstack/react-query'
import { get } from '../../lib/axios'
import { TMDB } from './types'
import { TMDBEnum } from '../../enums'

export const useTMDBContent = () => {
  const fetchTMDBList: () => Promise<TMDB> = async () => {
    return await get(TMDBEnum.BASE_API)
  }

  return useQuery({
    queryFn: fetchTMDBList,
    queryKey: ["fetchTMDBList"],
  })
}
