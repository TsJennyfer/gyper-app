/*eslint-disable no-unused-vars */
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import stubbedCourses from './stubs/COURSES'

const rootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: require('./components/App'),
    childRoutes: [
      require('../routes/Calendar'),
      require('../routes/Course'),
      require('../routes/Issues'),
      require('../routes/Users'),
      require('../routes/Chat'),
      require('../routes/Profile')
    ]
  } ]
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('reflux-app')
)
