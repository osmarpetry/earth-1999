import React, { useMemo } from 'react';
import styled from 'styled-components';
import Axios, { AxiosError } from 'axios';
import { useSWRInfinite } from 'swr';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import useLocalStorage, { writeStorage } from '@rehooks/local-storage';

import responsive from 'core/assets/styles/responsive';

import HeroCard from 'components/HeroCard';
import Placeholder from 'components/Placeholder';

import { Comic } from './model';

const ComicListSection = styled.section`
  @media only screen and (min-width: ${responsive.desktop}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media only screen and (max-width: ${responsive.mobile}) {
    section {
      width: 100%;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
`;

interface ComicListProps {
  id: number;
  onLastComicDate: (date: string) => void;
}

const publicKey = 'f909b33f6c6bf87364b06472a2c1d21d';
const url = (characterId: number) =>
  `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics`;

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Comic[];
}

function ComicList({ id, onLastComicDate }: ComicListProps) {
  const [favorites] = useLocalStorage(`favorites-comics-${id}`, []);
  const isMaxFavorites = favorites.length >= 5;

  const pageSize = 10;
  const { data, error, isValidating, size, setSize } = useSWRInfinite<
    Data,
    AxiosError
  >(
    (index) => [index, id],
    (index: number) => {
      const customParams = {
        limit: pageSize,
        offset: index === 0 ? 0 : index * pageSize,
        orderBy: '-onsaleDate',
      };
      const params = { ...customParams, apikey: publicKey };

      return Axios.get(`${url(id)}`, { params: params }).then((response) => {
        return response.data.data;
      });
    }
  );

  const infiniteRef = useInfiniteScroll({
    loading: isValidating,
    hasNextPage: size * pageSize <= (data ? data[0].total : 0),
    onLoadMore: () => setSize(size + 1),
  });

  const handleHearthClick = (favorited: boolean, resultId: number) => {
    if (!favorited && !isMaxFavorites) {
      writeStorage(`favorites-comics-${id}`, [...favorites, resultId]);
    } else {
      writeStorage(
        `favorites-comics-${id}`,
        favorites.filter((favorite) => favorite !== resultId)
      );
    }
  };

  useMemo(() => {
    if (data)
      onLastComicDate(
        (data &&
          data.length > 0 &&
          data[0].results &&
          data[0].results.length > 0 &&
          data[0].results[0].dates &&
          data[0].results[0].dates[0].date) ||
          new Date().toString()
      );
  }, [data, onLastComicDate]);

  return (
    <Placeholder
      isEmpty={data && data[0].count < 1 ? true : false}
      contentsName="HQs"
      status={error ? 'error' : data ? 'success' : 'loading'}
    >
      <>
        <h3>Last Releases</h3>
        <ComicListSection ref={infiniteRef}>
          {data
            ? data?.map((pages) =>
                pages.results.map((result) => {
                  const favorited =
                    favorites.filter((favorite) => favorite === result.id)
                      .length > 0;
                  return (
                    <HeroCard
                      height="210px"
                      width="190px"
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
                  );
                })
              )
            : [...Array(pageSize * size)].map((value) => (
                <HeroCard
                  loading={true}
                  key={value}
                  height="210px"
                  width="210px"
                />
              ))}
        </ComicListSection>
      </>
    </Placeholder>
  );
}

export default ComicList;
