import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import responsive from 'core/assets/styles/responsive';

import ButtonHeart from 'components/ButtonHeart';
import ItemWithDescription from 'components/ItemWithDescription';

import { ReactComponent as HQLogo } from 'assets/icones/book/Group@1,5x.svg';
import { ReactComponent as MovieLogo } from 'assets/icones/video/Shape@1,5x.svg';
import { Hero } from 'containers/HeroDetails/model';

const Img = styled.img`
  height: 340px;
  width: 310px;

  @media only screen and (max-width: ${responsive.mobile}) {
    height: 100%;
    width: 100%;
    align-self: center;
  }
`;

interface HeroDetailsProps {
  disabled: boolean;
  favorited: boolean;
  hero?: Hero;
  lastRelease: string;
  handleButtonClick: (favorited: boolean, heroId: number) => void;
}

export default function HeroDetails({
  hero,
  favorited,
  disabled,
  lastRelease,
  handleButtonClick,
}: HeroDetailsProps) {
  return (
    <>
      <div>
        {hero?.thumbnail && (
          <Img
            style={{ borderRadius: '5px' }}
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
    </>
  );
}
