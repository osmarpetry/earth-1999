import React, { useMemo } from 'react';
import Axios, { AxiosError } from 'axios';
import { useSWRInfinite } from 'swr';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import useLocalStorage, { writeStorage } from '@rehooks/local-storage';

import HeroCard from 'components/HeroCard';

import { Comic } from './model';

interface ComicListProps {
  id: number;
  onLastComicDate: (date: string) => void;
}

const publicKey = '75b68a884f36ba6b7d251c6bcbe88f8d';
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
  const { data, isValidating, size, setSize } = useSWRInfinite<
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
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
      ref={infiniteRef}
    >
      {data?.map((pages) =>
        pages.results.map((result) => {
          const favorited =
            favorites.filter((favorite) => favorite === result.id).length > 0;
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
      )}
    </section>
  );
}

export default ComicList;
