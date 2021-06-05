import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import App from './App';
import { Provider } from 'react-redux';
import { MainApp } from './mainApp';
import store from "./STORE/dishesStore";

ReactDOM.render(
  <Provider store = {store}>
    <MainApp />
  </Provider>
    
  ,
  document.getElementById('root')
);
