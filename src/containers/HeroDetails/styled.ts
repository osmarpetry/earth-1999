import styled from 'styled-components'

import responsive from 'core/assets/styles/responsive'

export const ComicListSection = styled.section`
  @media only screen and (min-width: ${responsive.desktop}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media only screen and (max-width: ${responsive.mobile}) {
    section {
      width: 100%;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
`


export const StyledMain = styled.main`
  display: flex;
  .left {
    @media only screen and (min-width: ${responsive.desktop}) {
      max-width: 300px;
      margin-left: 30px;
    }

    @media only screen and (max-width: ${responsive.mobile}) {
      margin-top: 30px;
      max-width: 100%;
    }

    h1 {
      margin-right: 30px;
    }
    span {
      display: flex;
      justify-content: space-between;
    }
  }

  @media only screen and (max-width: ${responsive.mobile}) {
    flex-direction: column;
  }
`

export const StyledFooter = styled.footer`
  h3 {
    padding-bottom: 20px;
  }
`

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  svg {
    margin-right: 30px;
  }

  @media only screen and (max-width: ${responsive.mobile}) {
    flex-direction: column;
    margin-bottom: 30px;
  }
`

export const Section = styled.section`
  padding: 0 40px;
  @media only screen and (max-width: ${responsive.mobile}) {
    padding: 0 10px;
  }
  background: gray;
  height: 100%;
  width: 100%;
`

