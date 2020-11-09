import React, { useState } from 'react'
import Axios, { AxiosError } from 'axios'
import { useSWRInfinite } from 'swr'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'

import useDebounce from 'core/utils/hooks/useDebounce'
import getPossibleHeroes from 'core/utils/possibleHeroes'
import { AllHeroes } from 'core/utils/heroes'

import ButtonHeart from 'components/ButtonHeart'
import CheckboxToggle from 'components/CheckboxToggle'
import HeroCard from 'components/HeroCard'
import Placeholder from 'components/Placeholder'
import SearchInput from 'components/InputSearch'
import SectionHeader from 'components/SectionHeader'

import { ReactComponent as HeroLogo } from 'assets/icones/heroi/noun_Superhero_2227044@1,5x.svg'
import { ReactComponent as MarvelHeaderLogo } from 'assets/logo/Group@1,5x.svg'

import { Hero } from './model'

import {
  SectionHeader2,
  SectionHeaderStyled,
  SpanRightColumnLeft,
  CheckboxChildren,
  SpanRightColumn,
  SectionMain,
  HeroesCardsWrapper
} from './styled'

interface Data {
  offset: 0
  limit: 20
  total: 1493
  count: 20
  results: Hero[]
}

type OrderBy = 'name' | '-name' | 'modified' | '-modified'

interface CharactersApiProps {
  limit: number
  offset: number
  orderBy: OrderBy
  name?: string
}

function HeroesList() {
  const [search, setSeach] = useState('')
  const debouceSearch = useDebounce(search, 1000)

  const [orderBy, setOderBy] = useState<OrderBy>('-modified')

  const [isSugestionsOpen, setIsSugestionOpen] = useState(false)
  const [possibleHeroes, setPossibleHeroes] = useState<AllHeroes[]>([])
  const [justFavorites, setJustFavorites] = useState(false)
  const [favorites] = useLocalStorage<Hero[]>(`favorites`, [])

  const isMaxFavorites = favorites.length >= 5
  const pageSize = 20

  const { data, error, size, setSize } = useSWRInfinite<Data, AxiosError>(
    index => [index, orderBy, pageSize, debouceSearch],
    (index: number) => {
      const customParams: CharactersApiProps = {
        limit: pageSize,
        offset: index === 0 ? 0 : index * pageSize,
        orderBy
      }

      if (debouceSearch !== '') customParams.name = debouceSearch

      const params = {
        ...customParams,
        apikey: process.env.REACT_APP_PUBLIC_KEY
      }

      return Axios.get('https://gateway.marvel.com:443/v1/public/characters', {
        params: params
      }).then(response => {
        return response.data.data
      })
    }
  )

  const handleSearch = (value: string) => {
    setSeach(value)
    setPossibleHeroes([{ id: undefined, name: value }, ...getPossibleHeroes(value)])
    setIsSugestionOpen(true)
  }

  const handleOrderBy = () => {
    setOderBy(orderBy === '-modified' ? 'name' : '-modified')
  }

  const handleButtonClick = (favorited: boolean, hero: Hero) => {
    if (!favorited && !isMaxFavorites) {
      writeStorage(`favorites`, [
        ...favorites,
        {
          id: hero.id,
          name: hero.name,
          thumbnail: hero.thumbnail
        }
      ])
    } else {
      writeStorage(
        'favorites',
        favorites.filter(favorite => favorite.id !== hero.id)
      )
    }
  }

  const infiniteRef = useInfiniteScroll({
    loading: false,
    hasNextPage: size * pageSize <= (data ? data[0].total : 0),
    onLoadMore: () => setSize(size + 1)
  })

  return (
    <div>
      <SectionHeader2>
        <header>
          <MarvelHeaderLogo width='228px' />
          <h2>EXPLORE THE UNIVERSE</h2>
        </header>
        <main>
          <p>
            Immerse yourself in the dazzling realm of all the classic characters
            you love - and those you will soon discover!
          </p>
          <div style={{ marginTop: '30px' }}>
            <SearchInput
              placeholder='Type a hero name...'
              isSugestionsOpen={isSugestionsOpen}
              label='Search for heroes'
              name='hero-search'
              onChange={value => handleSearch(value)}
              sugestions={possibleHeroes}
              value={search}
              onInputFocus={() => setIsSugestionOpen(true)}
              onSugestionsCloseClick={sugestion => {
                setIsSugestionOpen(false)
                setSeach(sugestion ? sugestion.name : search)
              }}
            />
          </div>
        </main>
      </SectionHeader2>
      <section ref={infiniteRef as any} style={{ margin: '0 10px' }}>
        <SectionHeaderStyled>
          <SectionHeader
            leftColumn={
              <p style={{ width: '100%', textAlign: 'center' }}>
                Found {pageSize * (data?.length || 1)} heroes
              </p>
            }
            rightColumn={
              <>
                <SpanRightColumnLeft>
                  <CheckboxToggle
                    checked={orderBy.includes('name')}
                    onClick={handleOrderBy}>
                    <CheckboxChildren>
                      <HeroLogo />
                      <p>Order by name - A/Z</p>
                    </CheckboxChildren>
                  </CheckboxToggle>
                </SpanRightColumnLeft>
                <SpanRightColumn>
                  <ButtonHeart
                    disabled={false}
                    value={justFavorites}
                    onClick={() => setJustFavorites(!justFavorites)}>
                    Just the favorites
                  </ButtonHeart>
                </SpanRightColumn>
              </>
            }
          />
        </SectionHeaderStyled>
        <SectionMain>
          {justFavorites ? (
            <HeroesCardsWrapper>
              {favorites.map(favoriteHero => {
                const favorited =
                  favorites.filter(favorite => favorite.id === favoriteHero.id)
                    .length > 0
                const disabled = isMaxFavorites && !favorited

                return (
                  <div>
                    <HeroCard
                      height='210px'
                      width='210px'
                      alt={favoriteHero.name}
                      linkTo={`hero/${favoriteHero.id}`}
                      imageSrc={
                        favoriteHero.thumbnail.path +
                        '.' +
                        favoriteHero.thumbnail.extension
                      }
                      name={favoriteHero.name}
                      favorite={favorited}
                      disabled={disabled}
                      onClick={() => handleButtonClick(favorited, favoriteHero)}
                      key={favoriteHero.id}
                    />
                  </div>
                )
              })}
            </HeroesCardsWrapper>
          ) : (
            <Placeholder
              isEmpty={!data || data?.length <= 0}
              status={data && !error ? 'success' : !error ? 'loading' : 'error'}
              contentsName='heroes'>
              <>
                {data
                  ? data?.map(heros =>
                      heros.results.map(hero => {
                        const favorited =
                          favorites.filter(favorite => favorite.id === hero.id)
                            .length > 0
                        const disabled = isMaxFavorites && !favorited
                        return (
                          <HeroCard
                            height='210px'
                            width='210px'
                            alt={hero.name}
                            linkTo={`hero/${hero.id}`}
                            imageSrc={
                              hero.thumbnail.path +
                              '.' +
                              hero.thumbnail.extension
                            }
                            name={hero.name}
                            favorite={favorited}
                            disabled={disabled}
                            onClick={() => handleButtonClick(favorited, hero)}
                            key={hero.id}
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
              </>
            </Placeholder>
          )}
        </SectionMain>
      </section>
    </div>
  )
}

export default HeroesList
