import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './Store';

// Root component, wrapper by Provider of the redux store
const root = ReactDOM.createRoot(document.getElementById('root') as Element);

/* These works as well

1. Non-null Assertion Operato
  const root = ReactDOM.createRoot(document.getElementById('root')!);

2. Type Assertions
const root = ReactDOM.createRoot((document.getElementById('root') as unknown) as DocumentFragment);
*/
root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
