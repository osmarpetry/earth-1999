import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import reportWebVitals from './reportWebVitals';

import App from './App';
import HeroDetails from 'containers/HeroDetails';

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/hero/:id" component={HeroDetails} />
        </Switch>
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
