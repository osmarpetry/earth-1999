import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Reset } from 'styled-reset'

import reportWebVitals from './reportWebVitals';

import { GlobalStyle } from 'core/assets/styles/global';

import HeroesList from './containers/HeroesList';
import HeroDetails from 'containers/HeroDetails';

ReactDOM.render(
  <React.StrictMode>
    <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HeroesList} />
          <Route path="/hero/:id" component={HeroDetails} />
        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
