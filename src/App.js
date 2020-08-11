import React, {Component} from 'react';
import './App.css'; 
import TOC from "./components/TOC";
import Content from "./components/content";
import Subject from "./components/subject";

class App extends Component { 
  constructor(props){
    super(props);

 //부모 컴포넌트(App)가 state라는 내부정보를 자식 컴포넌트(Subject, TOC)에게 props를 통해 전달
    this.state = { //state값을 초기화
      subject:{title:'WEB', sub:'World Wide Web!'},//객체
      contents:[ //데이터가 여러개이므로 대괄호로 배열 만듦
        {id:1, title:'HTML', desc:'HTML is for information'}, //객체
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  render(){ 
    return ( 
      <div className="App"> 
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject> 
        <TOC data={this.state.contents}></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    ); 
//상위 컴포넌트인 App의 상태를 하위 컴포넌트로 전달:상위컴포넌트의 state값을 하위 컴포넌트의 props값으로 전달
//Subject컴포넌트에게 props값으로 title, sub를 전달
//TOC컴포넌트에게 props값으로 data를 전달
//Content컴포넌트에게 props값으로 title, desc를 전달
  }
}

export default App;