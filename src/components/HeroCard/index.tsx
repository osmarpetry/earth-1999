import React from 'react';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import sizes from 'core/assets/styles/sizes';

import ButtonHeart from 'components/ButtonHeart';
import HeartIcon from 'components/ButtonHeart/HeartIcon';

import { HeroCardStyled, CardFooter, HeroName, Image } from './styled';


export interface HeroCardProps {
  alt?: string;
  disabled?: boolean;
  favorite?: boolean;
  height: string;
  imageSrc?: string;
  linkTo?: string;
  loading?: boolean;
  name?: string;
  width: string;
  onClick?: () => void;
}

export default function HeroCard({
  alt = '',
  disabled = false,
  favorite = false,
  height,
  imageSrc = '',
  linkTo,
  loading = false,
  name = '',
  width,
  onClick = () => {},
}: HeroCardProps) {
  if (loading) {
    return (
      <HeroCardStyled width={width}>
        <ContentLoader
          width={'100%'}
          height={height}
          style={{ borderRadius: '3px' }}
        >
          <rect width="100%" height="100%" />
        </ContentLoader>
        <CardFooter>
          <ContentLoader
            height={sizes.lineHeightParagraph}
            style={{ borderRadius: '3px', paddingRight: '10px' }}
          >
            <rect width="100%" height="100%" />
          </ContentLoader>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: 'fit-content',
            }}
          >
            <HeartIcon fill="rgba(255, 0,0,0.6)" stroke={"rgba(255, 0,0,0.6)"} />
          </span>
        </CardFooter>
      </HeroCardStyled>
    );
  }

  return (
    <HeroCardStyled width={width}>
      {linkTo ? (
        <Link to={linkTo}>
          <Image alt={alt} src={imageSrc} height={height} width={width} />
        </Link>
      ) : (
        <Image alt={alt} src={imageSrc} height={height} width={width} />
      )}
      <CardFooter>
        <HeroName>{name}</HeroName>
        <ButtonHeart value={favorite} disabled={disabled} onClick={onClick} />
      </CardFooter>
    </HeroCardStyled>
  );
}
