import React, {Component} from 'react';
import './App.css'; 
import TOC from "./components/TOC"; //components디렉토리 안에 있는 TOC.js파일에서 TOC컴포넌트를 가져옴
                                    //컴포넌트 클래스를 하나의 파일에 넣지 않고 각자 파일로 분리하면
                                    //다른 파일에서 가져다 쓰기 쉽고 정리가 쉬움
import Content from "./components/content";
import Subject from "./components/subject";

class App extends Component { 
  render(){ 
    return ( 
      <div className="App"> 
        <Subject title="WEB" sub="world wide web!"></Subject>
        <Subject title="React" sub="for UI"></Subject>
        <TOC></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    );
  }
}

export default App;