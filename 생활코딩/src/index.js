import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App />, //App컴포넌트를 실행 
           //이 코드가 내부적으로 state값이 subject가 있는지 없는지 모름
           //외부에서 알 필요가 없는 정보는 은닉해야함
  document.getElementById('root')
);

serviceWorker.unregister();