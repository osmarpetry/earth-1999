import ButtonHeart from 'components/ButtonHeart';
import colors from 'core/assets/styles/colors';
import fonts from 'core/assets/styles/fonts';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroCardStyled = styled.section<{ width: string }>`
  padding: 0;
  width: ${({ width }) => width};
  height: fit-content;
`;

const Image = styled.img<{ width: string; height: string }>`
  border-bottom: 3px solid red;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const CardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const HeroName = styled.p`
  margin: 0;
  color: ${colors.fontPrimary};
  font-weight: ${fonts.lightBold};
`;

export interface HeroCardProps {
  alt: string;
  disabled: boolean;
  favorite: boolean;
  height: string;
  imageSrc: string;
  linkTo?: string;
  name: string;
  width: string;
  onClick: () => void;
}

export default function HeroCard({
  alt,
  disabled,
  favorite,
  height,
  imageSrc,
  linkTo,
  name,
  width,
  onClick,
}: HeroCardProps) {
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
