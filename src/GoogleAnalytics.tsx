import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import { RouteComponentProps, withRouter } from 'react-router-dom'

function GoogleAnalytics({ location }: RouteComponentProps) {
  useEffect(() => {
    ReactGA.initialize('G-M9R0F0Y3X5')
    ReactGA.pageview(location.pathname)
  }, [location])

  return <div />
}

export default withRouter(GoogleAnalytics)
