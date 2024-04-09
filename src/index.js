import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';

import Home from './screens/Home';
import Login from './screens/Login';

let store = createStore(users, ['user']);

const router = createBrowserRouter([
  {
    path: '/',
    element: (<Login store={store} />)
  },
  {
    path: '/home',
    element: (<Home store={store} />)
  }
]);

function users(state = [], action) {
  switch(action.type) {
    case 'ADD_USER':
      return state.concat([ action.text ])
    default:
      return state
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
