import React, { useState } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import Axios, { AxiosError } from 'axios'
import useSWR from 'swr'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'

import { AllHeroes } from 'core/utils/heroes'
import getPossibleHeroes from 'core/utils/possibleHeroes'

import ComicList from './ComicList'

import HeroDetailsComponent from 'components/HeroDetails'
import SearchInput from 'components/InputSearch'

import { ReactComponent as MarvelHeaderLogo } from 'assets/logo/Group@1,5x.svg'

import { Hero } from './model'

import { Section, StyledHeader, StyledMain, StyledFooter } from './styled'

export interface Data {
  offset: number
  limit: number
  total: number
  count: number
  results: Hero[]
}

interface HeroDetailsProps {
  id: string
}

function HeroDetails({ match }: RouteComponentProps<HeroDetailsProps>) {
  const [search, setSeach] = useState('')

  const [isSugestionsOpen, setIsSugestionOpen] = useState(false)
  const [possibleHeroes, setPossibleHeroes] = useState<AllHeroes[]>([])

  const [favorites] = useLocalStorage(`favorites`, [])
  const isMaxFavorites = favorites.length >= 5

  const [lastRelease, setLastRelease] = useState('')

  const { data } = useSWR<Data, AxiosError>(
    `https://gateway.marvel.com:443/v1/public/characters/${match.params.id}`,
    url =>
      Axios.get(url, {
        params: { apikey: process.env.REACT_APP_PUBLIC_KEY }
      }).then(data => data.data.data)
  )

  const handleSearch = (value: string) => {
    setSeach(value)
    setPossibleHeroes([{ id: 0, name: value }, ...getPossibleHeroes(value)])
    setIsSugestionOpen(true)
  }

  const handleButtonClick = (favorited: boolean, heroId: number) => {
    if (!favorited && !isMaxFavorites) {
      writeStorage(`favorites`, [...favorites, heroId])
    } else {
      writeStorage(
        'favorites',
        favorites.filter(favorite => favorite !== heroId)
      )
    }
  }

  const hero = data?.results[0]
  const favorited =
    favorites.filter(favorite => favorite === hero?.id).length > 0
  const disabled = isMaxFavorites && !favorited

  return (
    <Section>
      <StyledHeader>
        <Link to='/'>
          <MarvelHeaderLogo width='228px' />
        </Link>
        <SearchInput
          isSecondary
          isSugestionsOpen={isSugestionsOpen}
          label='Procure por heroínas ou heróis'
          name='hero-search'
          sugestions={possibleHeroes}
          value={search}
          placeholder='Digite o nome de uma heroína ou herói...'
          onChange={value => handleSearch(value)}
          onInputFocus={() => setIsSugestionOpen(true)}
          onSugestionsCloseClick={sugestion => {
            setIsSugestionOpen(false)
            setSeach(sugestion ? sugestion.name : search)
          }}
        />
      </StyledHeader>
      <StyledMain style={{ marginBottom: '70px' }}>
        <HeroDetailsComponent
          hero={hero}
          loading={!hero}
          favorited={favorited}
          disabled={disabled}
          handleButtonClick={handleButtonClick}
          lastRelease={lastRelease}
        />
      </StyledMain>
      <StyledFooter>
        {hero?.id && (
          <ComicList
            id={hero.id}
            onLastComicDate={date => setLastRelease(date)}
          />
        )}
      </StyledFooter>
    </Section>
  )
}

export default withRouter(HeroDetails)
