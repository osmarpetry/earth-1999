import Axios, { AxiosError } from 'axios';
import ItemWithDescription from 'components/ItemWithDescription';
import React, { useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import useSWR from 'swr';
import ComicList from './ComicList';
import { ReactComponent as HQLogo } from 'assets/icones/book/Group@1,5x.svg';
import { ReactComponent as MovieLogo } from 'assets/icones/video/Shape@1,5x.svg';
import { format } from 'date-fns';
import ButtonHeart from 'components/ButtonHeart';
import useLocalStorage, { writeStorage } from '@rehooks/local-storage';
import SearchInput from 'components/InputSearch';
import { ReactComponent as MarvelHeaderLogo } from 'assets/logo/Group@1,5x.svg';
import { allHeroesIn08Nov2020 } from 'containers/HeroesList/heroes';

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
      font-size: 30px;
      margin-right: 30px;
    }
    span {
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }

    p {
      line-height: 17px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const StyledFooter = styled.footer`
  h2 {
    font-size: 18px;
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

    const possibleHero: { id: number; name: string }[] = value
      ? allHeroesIn08Nov2020.reduce(
          (
            accumulator: { id: number; name: string }[],
            currentValue: { id: number; name: string }
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
        background: '#E7F6E7',
        position: 'fixed',
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
          label="Procure por heróis"
          name="hero-search"
          sugestions={possibleHeroes}
          value={search}
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
        <h2>
          Últimos lançamentos
          {hero?.comics.available === 0 &&
            '(Nenhuma HQ exclusiva deste personagem D=)'}
        </h2>
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
