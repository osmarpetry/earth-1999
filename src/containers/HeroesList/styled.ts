import styled from 'styled-components'

import responsive from 'core/assets/styles/responsive'

export const SpanRightColumn = styled.span`
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${responsive.desktop}) {
    margin-left: 15px;
  }
`

export const CheckboxChildren = styled(SpanRightColumn)`
  display: flex;
  align-items: center;
  p {
    margin-left: 10px;
  }
`

export const SectionHeaderStyled = styled.header`
  margin: 20px 0;
`

export const SectionHeader2 = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`

export const HeroesCardsWrapper = styled.div`
  display: flex;
`

export const SectionMain = styled.main`
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
`

export const SpanRightColumnLeft = styled(SpanRightColumn)`
  @media only screen and (max-width: ${responsive.mobile}) {
    margin-bottom: 15px;
  }
`
