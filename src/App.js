import React from 'react'
import {
  Route,
 } from 'react-router-dom'
import RouteWithSubRoutes from './RouteWithSubRoutes'

const App = ({ routes }) => (

    <div>
      {routes.map((route, index) => (

        // pass in the initialData from the server for this specific route
        <RouteWithSubRoutes {...route} key={index}/>
      ))}
    </div>
)

export default App
