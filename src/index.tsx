import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/In-built-Files/App';
import * as serviceWorker from './serviceWorker';
import { setupServer } from "./Components/Mirage-Server/server";
import { Provider } from "react-redux";
import store from './Components/ReduxStore/store'
import firebase from './serviceworker/firebase';

const messaging = firebase.messaging();
messaging.requestPermission().then(() => {
  return messaging.getToken()
}).then((token: string) => {
  console.log(token)
  prompt("The toke is ", token);
})


if (process.env.NODE_ENV === 'development') {
  setupServer();
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store} >
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
