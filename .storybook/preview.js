import React from 'react';

import GlobalStyle from '../src/core/assets/styles/global'

export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}