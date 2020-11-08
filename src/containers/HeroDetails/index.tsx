import React, { useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { format } from 'date-fns';
import useLocalStorage, { writeStorage } from '@rehooks/local-storage';

import { AllHeroes, allHeroesIn08Nov2020 } from 'core/utils/heroes';
import colors from 'core/assets/styles/colors';

import ComicList from './ComicList';

import ButtonHeart from 'components/ButtonHeart';
import ItemWithDescription from 'components/ItemWithDescription';
import SearchInput from 'components/InputSearch';

import { ReactComponent as HQLogo } from 'assets/icones/book/Group@1,5x.svg';
import { ReactComponent as MarvelHeaderLogo } from 'assets/logo/Group@1,5x.svg';
import { ReactComponent as MovieLogo } from 'assets/icones/video/Shape@1,5x.svg';

interface HeroDetailsProps {
  id: string;
}
export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Item {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Series {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Events {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Url {
  type: string;
  url: string;
}

export interface Hero {
  id: number;
  name: string;
  description: string;
  modified: Date;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Url[];
}

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Hero[];
}

const publicKey = '75b68a884f36ba6b7d251c6bcbe88f8d';
const url = 'https://gateway.marvel.com:443/v1/public/characters/';
const params = { apikey: publicKey };

const StyledMain = styled.main`
  display: flex;
  .left {
    max-width: 300px;

    h1 {
      margin-right: 30px;
    }
    span {
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const StyledFooter = styled.footer`
  h3 {
    padding-bottom: 20px;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  svg {
    margin-right: 30px;
  }
`;

function HeroDetails({ match }: RouteComponentProps<HeroDetailsProps>) {
  const [lastRelease, setLastRelease] = useState('');
  const [favorites] = useLocalStorage(`favorites`, []);
  const isMaxFavorites = favorites.length >= 5;

  const { data } = useSWR<Data, AxiosError>(`${url}${match.params.id}`, (url) =>
    Axios.get(url, { params }).then((data) => data.data.data)
  );

  const hero = data?.results[0];

  const handleButtonClick = (favorited: boolean, heroId: number) => {
    if (!favorited && !isMaxFavorites) {
      writeStorage(`favorites`, [...favorites, heroId]);
    } else {
      writeStorage(
        'favorites',
        favorites.filter((favorite) => favorite !== heroId)
      );
    }
  };

  const favorited =
    favorites.filter((favorite) => favorite === hero?.id).length > 0;
  const disabled = isMaxFavorites && !favorited;
  const [search, setSeach] = useState('');
  const [isSugestionsOpen, setIsSugestionOpen] = useState(false);

  const [possibleHeroes, setPossibleHeroes] = useState<
    { id: number | undefined; name: string }[]
  >([]);
  const handleSearch = (value: string) => {
    setSeach(value);

    const possibleHero: AllHeroes[] = value
      ? allHeroesIn08Nov2020.reduce(
          (
            accumulator: AllHeroes[],
            currentValue: AllHeroes
          ) => {
            if (accumulator.length > 14) {
              return accumulator;
            }
            if (
              currentValue.name
                .toLocaleLowerCase()
                .includes(value.toLocaleLowerCase())
            ) {
              return [...accumulator, currentValue];
            }
            return accumulator;
          },
          []
        )
      : [];

    setPossibleHeroes([{ id: 0, name: value }, ...possibleHero]);
    setIsSugestionOpen(true);
  };

  return (
    <section
      style={{
        padding: '0 40px',
        background: colors.backgroundColorSecondary,
        height: '100%',
        width: '100%',
      }}
    >
      <StyledHeader>
        <Link to="/">
          <MarvelHeaderLogo width="228px" />
        </Link>
        <SearchInput
          isSecondary
          isSugestionsOpen={isSugestionsOpen}
          label="Procure por heroínas ou heróis"
          name="hero-search"
          sugestions={possibleHeroes}
          value={search}
        placeholder="Digite o nome de uma heroína ou herói..."
          onChange={(value) => handleSearch(value)}
          onSugestionClick={(sugestion) => {
            setIsSugestionOpen(false);
            setSeach(sugestion);
          }}
        />
      </StyledHeader>
      <StyledMain style={{ marginBottom: '70px' }}>
        <div style={{ marginRight: '70px' }}>
          {hero?.thumbnail && (
            <img
              style={{ borderRadius: '5px' }}
              height="340px"
              width="310px"
              src={hero?.thumbnail.path + '.' + hero?.thumbnail.extension}
              alt={hero.name}
            />
          )}
        </div>
        <div className="left">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <h1>{hero?.name}</h1>
            <ButtonHeart
              value={favorited}
              disabled={disabled}
              onClick={() => handleButtonClick(favorited, hero?.id || 0)}
            />
          </span>
          <p>
            {hero?.description
              ? hero?.description
              : `No description availble to: ${hero?.name} D=`}
          </p>

          {hero && (
            <div style={{ marginTop: '15px' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '50px' }}>
                  <ItemWithDescription
                    itemName="Quadrinhos"
                    hasTwoLines
                    description={hero?.comics.available}
                    descriptionLogo={<HQLogo />}
                  />
                </div>
                <ItemWithDescription
                  itemName="Eventos"
                  hasTwoLines
                  description={hero?.events.available}
                  descriptionLogo={<MovieLogo />}
                />
              </div>
              {lastRelease && (
                <ItemWithDescription
                  itemName="Último lançamento"
                  description={format(
                    new Date(lastRelease) || new Date(),
                    'dd MMM. yyyy'
                  )}
                />
              )}
            </div>
          )}
        </div>
      </StyledMain>
      <StyledFooter>
        <h3>
          Últimos lançamentos
          {hero?.comics.available === 0 &&
            '(Nenhuma HQ exclusiva deste personagem D=)'}
        </h3>
        {hero?.id && (
          <ComicList
            id={hero?.id}
            onLastComicDate={(date) => setLastRelease(date)}
          />
        )}
      </StyledFooter>
    </section>
  );
}

export default withRouter(HeroDetails);
