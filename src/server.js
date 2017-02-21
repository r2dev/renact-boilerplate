import express from 'express'
import { matchPath, StaticRouter }  from 'react-router'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'

import path from 'path'
const app = express()
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { flushToHTML } from 'styled-jsx/server'
import Home from './Home'
const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  }
]

const createMatch = (routes, req, store) => {
  let matches = []
  routes.map((route) => {
    const match = matchPath(req.url, route.path, route)
    if (match) {
      matches.push({
        route,
        match,
        promise: route.component.fetchData ?
          route.component.fetchData(match, store): Promise.resolve(null)
      })
    }
    if (route.routes) {
      createMatch(route.routes)
    }
  })
  return matches
}


app.use(express.static(path.join(__dirname, 'static/js')))
app.get("*", (req, res) => {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  let matches = createMatch(routes, req, store)
  if (matches.length === 0) {
    res.status(404)
  }

  const promises = matches.map((match) => match.promise)
  Promise.all(promises).then(() => {
    const context = {}

    const markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App routes={routes} />
        </StaticRouter>
      </Provider>
    )
    if (context.url) {
      res.redirect(context.url)
    } else {
      const preloadedState = store.getState()
      const styles = flushToHTML()
      // console.log(data)
      res.send(`
        <!doctype html>
        <html>
          <head>
            ${styles}
          </head>
          <body>
            <div id="app">${markup}</div>
            <script>window.__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
            <script src="./client.bundle.js"></script>
          </body>
        </html>
        `)
    }
  }, (error) => {
    console.error(res + '   ' + error)
  })
})

app.listen(3000, () => {
  console.log('Express app listening on port 3000')
})
