import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; //현재 디렉토리의 App.js파일에서 App컴포넌트를 load
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') //괄호속 string이 index.html의 div 태그의 id와 같아야 함
);

serviceWorker.unregister();
