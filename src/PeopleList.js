import React, { Component } from 'react'
import {
  Link,
  Route,
} from 'react-router-dom'
import RouteWithSubRoutes from './RouteWithSubRoutes'
class PeopleList extends Component {
  render() {
    return (
      <div>
        PeopleList
        <Link to="/home">Home</Link>
        <Link to="/people/ren">Ren</Link>
        {this.props.routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </div>
    )
  }
}




export default PeopleList
