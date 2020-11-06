import Axios, { AxiosError } from 'axios';
import React from 'react';
import { useSWRInfinite } from 'swr';

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Item {
  resourceURI: string;
  name: string;
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Item2 {
  resourceURI: string;
  name: string;
}

export interface Series {
  available: number;
  collectionURI: string;
  items: Item2[];
  returned: number;
}

export interface Item3 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: Item3[];
  returned: number;
}

export interface Item4 {
  resourceURI: string;
  name: string;
}

export interface Events {
  available: number;
  collectionURI: string;
  items: Item4[];
  returned: number;
}

export interface Url {
  type: string;
  url: string;
}

interface HeroesResult {
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

interface Data {
  offset: 0;
  limit: 20;
  total: 1493;
  count: 20;
  results: HeroesResult[];
}

function HeroesList() {
  const publicKey = '75b68a884f36ba6b7d251c6bcbe88f8d';
  const url = 'https://gateway.marvel.com:443/v1/public/characters';
  const pageSize = 20;

  const { data, size, setSize } = useSWRInfinite<Data, AxiosError>(
    (index) => [index],
    (index: number) => {
      const customParams = {
        limit: pageSize,
        offset: index === 0 ? 0 : index * pageSize,
      };
      const params = { ...customParams, apikey: publicKey };

      return Axios.get(url, { params: params }).then((response) => {
        return response.data.data;
      });
    }
  );

  return (
    <section>
      <button
        disabled={data && data[0].total <= size * pageSize}
        onClick={() => setSize(size + 1)}
      >
        Heros page: {size}
      </button>
      <h1>Marvel Sample App</h1>
      <section style={{ display: 'flex', flexWrap: 'wrap', margin: '0 40px' }}>
        {data?.map((heros) =>
          heros.results.map((hero) => (
            <section style={{ margin: '0 35px 20px 35px' }}>
              <a href={`/hero/${hero.id}`}>
                <img
                  src={hero.thumbnail.path + '.' + hero.thumbnail.extension}
                  alt={`${hero.name} avatar`}
                  height="221px"
                  width="221px"
                />
                <p>{hero.name}</p>
              </a>
            </section>
          ))
        )}
      </section>
    </section>
  );
}

export default HeroesList;
