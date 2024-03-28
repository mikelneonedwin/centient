import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx';
import { Provider } from 'react-redux';
import Store from './store';

/* eslint-disable no-undef */
if ('serviceWorker' in navigator) {
  if (process.env.NODE_ENV == "production") {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service worker registered'))
      .catch((err) => console.log('Service worker not registered', err))
  } else {
    navigator.serviceWorker.register('/dev.js')
      .then(() => console.log('dev worker registered'))
      .catch((err) => console.log('could not register dev worker', err))
  }
}

if (localStorage.theme === 'dark')
  document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
