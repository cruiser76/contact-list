import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer, {Operation} from './redux/reducer.js';
import {createAPI} from './api.js';
import App from './components/app/app.jsx';

const onUnauthorized = () => {};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);


const init = () => {

  ReactDOM.render(
      <Provider store = {store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
// store.dispatch(Operation.loadContacts()).then(init);
// store.dispatch(UserOperation.checkAuth());

