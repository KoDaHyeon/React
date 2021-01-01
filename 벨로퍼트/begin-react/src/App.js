import React from 'react';
import Hello from './Hello'; 
// ./Hello.js파일에서 Hello 컴포넌트를 import -> 이제 Hello 컴포넌트를 사용할 수 있음
// 뒤에 .js는 빼도 됨
// Hello 컴포넌트는 여러번 재사용 가능
import './App.css';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24,
    padding: '1rem'
  }

  return (
    <div>
      <Hello />
      <Hello />
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
    </div>
  );
}

export default App;
