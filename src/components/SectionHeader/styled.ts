import styled from 'styled-components';

import colors from 'core/assets/styles/colors';
import responsive from 'core/assets/styles/responsive';
import sizes from 'core/assets/styles/sizes';

export const SectionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${responsive.mobile}) {
    flex-direction: column;
  }

  @media only screen and (max-width: ${responsive.mobile}) {
    * {
      font-size: ${sizes.paragraphSize};
    }
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  color: ${colors.fontAuxiliary};
  align-items: center;
  @media only screen and (max-width: ${responsive.mobile}) {
    width: 100%;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  align-items: center;
  p {
    color: ${colors.primary};
  }

  @media only screen and (max-width: ${responsive.mobile}) {
    margin-top: 15px;
    align-items: center;
    flex-direction: column;
  }
`;
