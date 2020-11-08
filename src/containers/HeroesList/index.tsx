import React, { useState } from 'react';
import Axios, { AxiosError } from 'axios';
import { useSWRInfinite } from 'swr';
import styled from 'styled-components';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import useLocalStorage, { writeStorage } from '@rehooks/local-storage';

import useDebounce from 'core/utils/hooks/useDebounce';
import { AllHeroes, allHeroesIn08Nov2020 } from 'core/utils/heroes';

import ButtonHeart from 'components/ButtonHeart';
import CheckboxToggle from 'components/CheckboxToggle';
import HeroCard from 'components/HeroCard';
import SearchInput from 'components/InputSearch';
import SectionHeader from 'components/SectionHeader';

import { ReactComponent as HeroLogo } from 'assets/icones/heroi/noun_Superhero_2227044@1,5x.svg';
import { ReactComponent as MarvelHeaderLogo } from 'assets/logo/Group@1,5x.svg';

import { Hero } from './model';
import responsive from 'core/assets/styles/responsive';

interface Data {
  offset: 0;
  limit: 20;
  total: 1493;
  count: 20;
  results: Hero[];
}

type OrderBy = 'name' | '-name' | 'modified' | '-modified';

interface CharactersApiProps {
  limit: number;
  offset: number;
  orderBy: OrderBy;
  name?: string;
}

const SpanRightColumn = styled.span`
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${responsive.desktop}) {
    margin-left: 15px;
  }
`;

const CheckboxChildren = styled(SpanRightColumn)`
  display: flex;
  align-items: center;
  p {
    margin-left: 10px;
  }
`;

const SectionHeaderStyled = styled.header`
  margin: 20px 0;
`;

const SectionHeader2 = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const HeroesCardsWrapper = styled.div`
  display: flex;
`;

const SectionMain = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: ${responsive.mobile}) {
    section {
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const SpanRightColumnLeft = styled(SpanRightColumn)`
  @media only screen and (max-width: ${responsive.mobile}) {
    margin-bottom: 15px;
  }
`;

function HeroesList() {
  const publicKey = '75b68a884f36ba6b7d251c6bcbe88f8d';
  const url = 'https://gateway.marvel.com:443/v1/public/characters';
  const [pageSize] = useState(20);
  const deboucePageSize = useDebounce(pageSize, 1000);
  const [orderBy, setOderBy] = useState<OrderBy>('-modified');
  const [search, setSeach] = useState('');
  const debouceSearch = useDebounce(search, 1000);
  const [isSugestionsOpen, setIsSugestionOpen] = useState(false);
  const [justFavorites, setJustFavorites] = useState(false);

  const [possibleHeroes, setPossibleHeroes] = useState<
    { id: number | undefined; name: string }[]
  >([]);
  const [favorites] = useLocalStorage<Hero[]>(`favorites`, []);
  const isMaxFavorites = favorites.length >= 5;

  const { data, isValidating, size, setSize } = useSWRInfinite<
    Data,
    AxiosError
  >(
    (index) => [index, orderBy, deboucePageSize, debouceSearch],
    (index: number) => {
      const customParams: CharactersApiProps = {
        limit: deboucePageSize,
        offset: index === 0 ? 0 : index * pageSize,
        orderBy,
      };

      if (debouceSearch !== '') customParams.name = debouceSearch;

      const params = { ...customParams, apikey: publicKey };

      return Axios.get(url, { params: params }).then((response) => {
        return response.data.data;
      });
    }
  );

  const handleSearch = (value: string) => {
    setSeach(value);

    const possibleHero: AllHeroes[] = value
      ? allHeroesIn08Nov2020.reduce(
          (accumulator: AllHeroes[], currentValue: AllHeroes) => {
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

    setPossibleHeroes([{ id: undefined, name: value }, ...possibleHero]);
    setIsSugestionOpen(true);
  };

  const handleOrderBy = () => {
    setOderBy(orderBy === '-modified' ? 'name' : '-modified');
  };

  const handleButtonClick = (favorited: boolean, hero: Hero) => {
    if (!favorited && !isMaxFavorites) {
      writeStorage(`favorites`, [
        ...favorites,
        {
          id: hero.id,
          name: hero.name,
          thumbnail: hero.thumbnail,
        },
      ]);
    } else {
      writeStorage(
        'favorites',
        favorites.filter((favorite) => favorite.id !== hero.id)
      );
    }
  };

  const infiniteRef = useInfiniteScroll({
    loading: isValidating || justFavorites,
    hasNextPage: size * pageSize <= (data ? data[0].total : 0),
    onLoadMore: () => setSize(size + 1),
  });

  console.log(data);

  return (
    <div>
      <SectionHeader2>
        <header>
          <MarvelHeaderLogo width="228px" />
          <h2>EXPLORE O UNIVERSO</h2>
        </header>
        <main>
          <p>
            Mergule no domínio deslubrante de todos os personagens clássicos que
            você ama - e aqueles que você descobrirá em breve!
          </p>
          <div style={{ marginTop: '30px' }}>
            <SearchInput
              placeholder="Digite o nome de uma heroína ou herói..."
              isSugestionsOpen={isSugestionsOpen}
              label="Procure por heroínas ou heróis"
              name="hero-search"
              onChange={(value) => handleSearch(value)}
              sugestions={possibleHeroes}
              value={search}
              onSugestionClick={(sugestion) => {
                setIsSugestionOpen(false);
                setSeach(sugestion);
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
                Encontrados {pageSize * (data?.length || 1)} heroínas e heróis{' '}
              </p>
            }
            rightColumn={
              <>
                <SpanRightColumnLeft>
                  <CheckboxToggle
                    checked={orderBy.includes('name')}
                    onClick={handleOrderBy}
                  >
                    <CheckboxChildren>
                      <HeroLogo />
                      <p>Ordernar por nome - A/Z</p>
                    </CheckboxChildren>
                  </CheckboxToggle>
                </SpanRightColumnLeft>
                <SpanRightColumn>
                  <ButtonHeart
                    disabled={false}
                    value={justFavorites}
                    onClick={() => setJustFavorites(!justFavorites)}
                  >
                    Somente Favoritos
                  </ButtonHeart>
                </SpanRightColumn>
              </>
            }
          />
        </SectionHeaderStyled>
        <SectionMain>
          {justFavorites ? (
            <HeroesCardsWrapper>
              {favorites.map((favoriteHero) => {
                const favorited =
                  favorites.filter(
                    (favorite) => favorite.id === favoriteHero.id
                  ).length > 0;
                const disabled = isMaxFavorites && !favorited;

                return (
                  <div>
                    <HeroCard
                      height="210px"
                      width="210px"
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
                );
              })}
            </HeroesCardsWrapper>
          ) : (
            data?.map((heros) =>
              heros.results.map((hero) => {
                const favorited =
                  favorites.filter((favorite) => favorite.id === hero.id)
                    .length > 0;
                const disabled = isMaxFavorites && !favorited;
                return (
                  <HeroCard
                    height="210px"
                    width="210px"
                    alt={hero.name}
                    linkTo={`hero/${hero.id}`}
                    imageSrc={
                      hero.thumbnail.path + '.' + hero.thumbnail.extension
                    }
                    name={hero.name}
                    favorite={favorited}
                    disabled={disabled}
                    onClick={() => handleButtonClick(favorited, hero)}
                    key={hero.id}
                  />
                );
              })
            )
          )}
        </SectionMain>
      </section>
    </div>
  );
}

export default HeroesList;
