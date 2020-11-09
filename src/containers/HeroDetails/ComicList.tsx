import React, { useMemo } from 'react'
import Axios, { AxiosError } from 'axios'
import { useSWRInfinite } from 'swr'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'

import HeroCard from 'components/HeroCard'
import Placeholder from 'components/Placeholder'

import { Comic } from './model'

import { ComicListSection } from './styled'

interface ComicListProps {
  id: number
  onLastComicDate: (date: string) => void
}

export interface Data {
  offset: number
  limit: number
  total: number
  count: number
  results: Comic[]
}

function ComicList({ id, onLastComicDate }: ComicListProps) {
  const [favorites] = useLocalStorage(`favorites-comics-${id}`, [])
  const isMaxFavorites = favorites.length >= 5

  const pageSize = 10

  const { data, error, isValidating, size, setSize } = useSWRInfinite<
    Data,
    AxiosError
  >(
    index => [index, id],
    (index: number) => {
      const customParams = {
        limit: pageSize,
        offset: index === 0 ? 0 : index * pageSize,
        orderBy: '-onsaleDate'
      }

      return Axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}/comics`,
        {
          params: { ...customParams, apikey: process.env.REACT_APP_PUBLIC_KEY }
        }
      ).then(response => {
        return response.data.data
      })
    }
  )

  const handleHearthClick = (favorited: boolean, resultId: number) => {
    if (!favorited && !isMaxFavorites) {
      writeStorage(`favorites-comics-${id}`, [...favorites, resultId])
    } else {
      writeStorage(
        `favorites-comics-${id}`,
        favorites.filter(favorite => favorite !== resultId)
      )
    }
  }

  const infiniteRef = useInfiniteScroll({
    loading: isValidating || data?.length === 0,
    hasNextPage: size * pageSize <= (data ? data[0].total : 0),
    onLoadMore: () => setSize(size + 1)
  })

  useMemo(() => {
    if (data && data[0]?.results[0]?.dates[0]?.date)
      onLastComicDate(data[0]?.results[0]?.dates[0]?.date)
  }, [data, onLastComicDate])

  return (
    <Placeholder
      isEmpty={data && data[0].count < 1 ? true : false}
      contentsName='HQs'
      status={error ? 'error' : data ? 'success' : 'loading'}>
      <>
        <h3>Last Releases</h3>
        <ComicListSection ref={infiniteRef}>
          {data
            ? data?.map(pages =>
                pages.results.map(result => {
                  const favorited =
                    favorites.filter(favorite => favorite === result.id)
                      .length > 0
                  return (
                    <HeroCard
                      height='210px'
                      width='190px'
                      alt={result.title}
                      disabled={isMaxFavorites && !favorited}
                      favorite={favorited}
                      imageSrc={
                        result.thumbnail.path + '.' + result.thumbnail.extension
                      }
                      name={result.title}
                      onClick={() => handleHearthClick(favorited, result.id)}
                      key={result.id}
                    />
                  )
                })
              )
            : [...Array(pageSize * size)].map(value => (
                <HeroCard
                  loading={true}
                  key={value}
                  height='210px'
                  width='210px'
                />
              ))}
        </ComicListSection>
      </>
    </Placeholder>
  )
}

export default ComicList
