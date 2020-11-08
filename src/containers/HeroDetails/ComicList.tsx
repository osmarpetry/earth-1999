import useLocalStorage, { writeStorage } from '@rehooks/local-storage';
import Axios, { AxiosError } from 'axios';
import HeroCard from 'components/HeroCard';
import React, { useMemo } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useSWRInfinite } from 'swr';

interface ComicListProps {
  id: number;
  onLastComicDate: (date: string) => void;
}

const publicKey = '75b68a884f36ba6b7d251c6bcbe88f8d';
const url = (characterId: number) =>
  `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics`;

export interface TextObject {
  type: string;
  language: string;
  text: string;
}

export interface Url {
  type: string;
  url: string;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Variant {
  resourceURI: string;
  name: string;
}

export interface Date {
  type: string;
  date: any;
}

export interface Price {
  type: string;
  price: number;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Image {
  path: string;
  extension: string;
}

export interface Item {
  resourceURI: string;
  name: string;
  role?: string;
  type?: string;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Characters {
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

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Series;
  variants: Variant[];
  collections: any[];
  collectedIssues: any[];
  dates: Date[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Image[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Events;
}

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
    (index) => [index, index],
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
    if (data) onLastComicDate(data[0].results[0].dates[0].date);
  }, [data, onLastComicDate]);

  return (
    <section
      style={{ display: 'flex', flexWrap: 'wrap', margin: '0 40px' }}
      ref={infiniteRef}
    >
      {data?.map((pages) =>
        pages.results.map((result) => {
          const favorited =
            favorites.filter((favorite) => favorite === result.id).length > 0;
          return (
            <HeroCard
              height="210px"
              width="210px"
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
