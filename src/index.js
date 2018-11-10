import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

let e = document.createElement("div");
e.id = "root";
document.getElementsByTagName('body')[0].appendChild(e);
ReactDOM.render(<Root/> , document.getElementById('root'));
