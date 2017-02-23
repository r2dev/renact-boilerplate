import Home from './Home'
import PeopleList from './PeopleList'
import RenPage from './RenPage'
export default [
  {
    path: '/Home',
    component: Home,
    exact: true
  },
  {
    path: '/people',
    component: PeopleList,
    routes: [
      {
        path: '/people/ren',
        component: RenPage
      }
    ]
  }
]
