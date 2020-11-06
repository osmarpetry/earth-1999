import Axios, { AxiosError } from 'axios';
import React, { useMemo } from 'react';
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
  const pageSize = 10;
  const { data, size, setSize } = useSWRInfinite<Data, AxiosError>(
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

  useMemo(() => {
    if (data) onLastComicDate(data[0].results[0].dates[0].date);
  }, [data, onLastComicDate]);

  return (
    <>
      <button
        disabled={data && data[0].total <= size * pageSize}
        onClick={() => setSize(size + 1)}
      >
        Comics page: {size}
      </button>

      <section style={{ display: 'flex', flexWrap: 'wrap', margin: '0 40px' }}>
        {data?.map((pages) =>
          pages.results.map((result) => (
            <section style={{ margin: '0 35px 20px 35px' }}>
              <img
                src={result.thumbnail.path + '.' + result.thumbnail.extension}
                alt={result.title}
                height="220px"
                width="150px"
              />
              <p style={{ maxWidth: '150px' }}>{result.title}</p>
            </section>
          ))
        )}
      </section>
    </>
  );
}

export default ComicList;
