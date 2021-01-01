import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render( //실제 브라우저의 DOM의 내부에, 리액트 컴포넌트를 렌더링
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') 
  //id가 root인 DOM에 리액트 컴포넌트를 렌더링
  //id가 root인 DOM은 현재 index.html에 있음. 여기에 리액트 컴포넌트가 렌더링되는 것임!
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
