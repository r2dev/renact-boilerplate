import React from 'react'
import {
  Route,
 } from 'react-router-dom'

const App = ({ routes, initialData = [] }) => (

    <div>
      {routes.map((route, index) => (

        // pass in the initialData from the server for this specific route
        <Route {...route} key={index}/>
      ))}
    </div>
)

export default App
