import React from 'react'
import { format } from 'date-fns'
import ContentLoader from 'react-content-loader'

import sizes from 'core/assets/styles/sizes'

import { Hero } from 'containers/HeroDetails/model'

import ButtonHeart from 'components/ButtonHeart'
import HeartIcon from 'components/ButtonHeart/HeartIcon'
import ItemWithDescription from 'components/ItemWithDescription'

import { ReactComponent as HQLogo } from 'assets/icones/book/Group@1,5x.svg'
import { ReactComponent as MovieLogo } from 'assets/icones/video/Shape@1,5x.svg'

import { Image } from './styled'

interface HeroDetailsProps {
  disabled: boolean
  favorited: boolean
  loading?: boolean
  hero?: Hero
  lastRelease: string
  handleButtonClick: (favorited: boolean, heroId: number) => void
}

export default function HeroDetails({
  hero,
  favorited,
  disabled,
  loading = false,
  lastRelease,
  handleButtonClick
}: HeroDetailsProps) {
  const ReleaseDateSkeleton = () => (
    <ItemWithDescription
      itemName='Last release'
      description={
        <ContentLoader
          height={sizes.lineHeightParagraph}
          width='170px'
          style={{ borderRadius: '3px', paddingRight: '10px' }}>
          <rect width='100%' height='100%' />
        </ContentLoader>
      }
    />
  )

  if (loading) {
    return (
      <>
        <ContentLoader style={{ borderRadius: '3px' }}>
          <rect width='100%' height='310px' />
        </ContentLoader>
        <div className='left'>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '20px'
            }}>
            <ContentLoader
              height={sizes.h1Size}
              style={{ borderRadius: '3px', paddingRight: '10px' }}>
              <rect width='100%' height='100%' />
            </ContentLoader>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: 'fit-content'
              }}>
              <HeartIcon
                fill='rgba(255, 0,0,0.6)'
                stroke={'rgba(255, 0,0,0.6)'}
              />
            </span>
          </span>
          <ContentLoader
            width='100%'
            height={'170px'}
            style={{ borderRadius: '3px', paddingRight: '10px' }}>
            <rect width='100%' height='100%' />
          </ContentLoader>
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '50px' }}>
                <ItemWithDescription
                  itemName='HQs'
                  hasTwoLines
                  description={
                    <ContentLoader
                      height={sizes.lineHeightParagraph}
                      width='40px'
                      style={{ borderRadius: '3px', paddingRight: '10px' }}>
                      <rect width='100%' height='100%' />
                    </ContentLoader>
                  }
                  descriptionLogo={<HQLogo />}
                />
              </div>
              <ItemWithDescription
                itemName='Events'
                hasTwoLines
                description={
                  <ContentLoader
                    height={sizes.lineHeightParagraph}
                    width='40px'
                    style={{ borderRadius: '3px', paddingRight: '10px' }}>
                    <rect width='100%' height='100%' />
                  </ContentLoader>
                }
                descriptionLogo={<MovieLogo />}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <ReleaseDateSkeleton />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        {hero?.thumbnail && (
          <Image
            style={{ borderRadius: '5px' }}
            src={hero?.thumbnail.path + '.' + hero?.thumbnail.extension}
            alt={hero.name}
          />
        )}
      </div>
      <div className='left'>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
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
            : `No description availble to: ${hero?.name} hero`}
        </p>
        <div style={{ marginTop: '15px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '50px' }}>
              <ItemWithDescription
                itemName='HQs'
                hasTwoLines
                description={hero?.comics.available}
                descriptionLogo={<HQLogo />}
              />
            </div>
            <ItemWithDescription
              itemName='Events'
              hasTwoLines
              description={hero?.events.available}
              descriptionLogo={<MovieLogo />}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            {lastRelease ? (
              <ItemWithDescription
                itemName='Last release'
                description={format(
                  new Date(lastRelease) || new Date(),
                  'dd MMM. yyyy'
                )}
              />
            ) : (
              <ReleaseDateSkeleton />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
