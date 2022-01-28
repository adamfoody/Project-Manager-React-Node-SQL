import React from 'react';
import App from './App';
import {Route, Switch} from "react-router-dom";
import { BrowserRouter, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
 </BrowserRouter>,
  document.getElementById('root')
);

