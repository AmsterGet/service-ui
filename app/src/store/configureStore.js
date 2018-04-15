import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';
import queryString from 'qs';
import reduxThunk from 'redux-thunk';

import routesMap, { onBeforeRouteChange } from 'routes/routesMap';
import reducers from './reducers';

const composeEnhancers = (...args) =>
  typeof window !== 'undefined' ? composeWithDevTools({})(...args) : compose(...args);

export const configureStore = (history, preloadedState) => {
  const { reducer, middleware, enhancer } = connectRoutes(history, routesMap, {
    querySerializer: queryString,
    onBeforeChange: onBeforeRouteChange,
  });

  const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line no-underscore-dangle
  const reduxLogger = reduxDevToolsExtension ? reduxDevToolsExtension({ maxAge: 30 }) : (f) => f;

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(reduxThunk, middleware);
  const enhancers = composeEnhancers(enhancer, middlewares, reduxLogger);
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers', () => {
      const reducers2 = require('./reducers'); // eslint-disable-line global-require
      const rootReducer2 = combineReducers({ ...reducers2, location: reducer });
      store.replaceReducer(rootReducer2);
    });
  }

  return { store };
};
