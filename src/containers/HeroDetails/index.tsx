import Axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import useSWR from 'swr';
import ComicList from './ComicList';

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

function HeroDetails({ match }: RouteComponentProps<HeroDetailsProps>) {
  const [lastRelease, setLastRelease] = useState('')
  const { data } = useSWR<Data, AxiosError>(`${url}${match.params.id}`, (url) =>
    Axios.get(url, { params }).then((data) => data.data.data)
  );

  const hero = data?.results[0];

  return (
    <section>
      <h1>{hero?.name}</h1>
      <p>
        {hero?.description
          ? hero?.description
          : `No description availble to: ${hero?.name} D=`}
      </p>
      <div>
        <p>Quadrinhos: {hero?.comics.available}</p>
        <p>Eventos: {hero?.events.available}</p>
        <p>Último quandrinho: {lastRelease.toString()}</p>
      </div>
      <section>
        <h1>
          Últimos lançamentos
          {hero?.comics.available === 0 &&
            '(Nenhuma HQ exclusiva deste personagem D=)'}
        </h1>
        {hero?.id && <ComicList id={hero?.id} onLastComicDate={date => setLastRelease(date)} />}
      </section>
    </section>
  );
}

export default withRouter(HeroDetails);
