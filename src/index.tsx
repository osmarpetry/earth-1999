import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Reset } from 'styled-reset'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { version as appVersion } from './../package.json'

import reportWebVitals from './reportWebVitals'

import { GlobalStyle } from 'core/assets/styles/global'

import GoogleAnalytics from 'GoogleAnalytics'
import HeroesList from 'containers/HeroesList'
import HeroDetails from 'containers/HeroDetails'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn:
      'https://33ae6e879f9e4a6fa30dfc7017702685@o431471.ingest.sentry.io/5509039',
    environment: process.env.NODE_ENV,
    release: appVersion,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  })
}

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <BrowserRouter>
      {process.env.NODE_ENV !== 'development' && <GoogleAnalytics />}
      <Switch>
        <Route exact path='/' component={HeroesList} />
        <Route path='/hero/:id' component={HeroDetails} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
