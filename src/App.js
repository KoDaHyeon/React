import React, {Component} from 'react';
import './App.css'; 
import TOC from "./components/TOC";
import Content from "./components/content";
import Subject from "./components/subject";

class App extends Component { 
  constructor(props){ 
    //(컴포넌트가 생성될때 최초로 실행되는)생성자
    //컴포넌트가 실행될때 render보다 먼저 실행되고, 컴포넌트를 초기화 시키고 싶을 때는 constructor안에 코드 삽입
    super(props);

    //부모 컴포넌트(App)가 state라는 내부정보를 자식 컴포넌트(Subject, TOC)에게 props를 통해 전달
    //props, state값이 바뀌면 props, state값을 가지고있는 컴포넌트의 render 함수가 다시 호출됨-> render함수 하위에 있는 컴포넌트들의 render함수도 싹 다시 호출됨 -> 화면이 다시 그려짐
    //render함수 : 어떤 html을 그릴 것인가를 결정하는 함수

    this.state = { //state값을 초기화
      mode:'read', //read페이지인지 welcome페이지인지 구별하기 위해
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'}, //mode가 welcome일때 표시할 텍스트:Hello, React!
      contents:[ 
        {id:1, title:'HTML', desc:'HTML is for information'}, 
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  } 

  render(){ 
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title=this.state.welcome.title; //this.state.mode.title은 안됨
      _desc=this.state.welcome.desc;
    }
    else if(this.state.mode === 'read'){
      _title=this.state.contents[0].title;
      _desc=this.state.contents[0].desc;
    }

    return ( 
      <div className="App"> 
        {/*<Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject> */}
        <header> 
          <h1><a href="/" onClick={function(e){
            console.log(e);
            e.preventDefault();
            //debugger;
            //this.state.mode='welcome'; //error뜸
            /*error이유
            1. 이벤트가 발생했을때 실행되는 이 함수 안에서는 this가 컴포넌트 자신을 가리키지 않고, 아무것도 가리키지 않음
             ->해결 : 이벤트 함수 바로 뒤에 .bind(this) 추가
             ** .bind(이벤트 함수안에서의 this와 바인딩하려는 객체) **
            2. 컴포넌트가 생성된 후 state를 변경할때는 직접 state를 설정하면 안됨
             ->해결 : this.setState({mode:'welcome'});
            */
           this.setState({mode:'welcome'});
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    ); 
    //상위 컴포넌트인 App의 상태를 하위 컴포넌트로 전달:상위컴포넌트의 state값을 하위 컴포넌트의 props에 전달
    //중간에 자바스크립트 코드 넣으려면 {}안에 넣음
    //onClick : 자바스크립트에서는 onclick인데 React코드에서는 onClick
    //onClick={function(e){...}} : 클릭하면 이벤트 객체를 함수의 첫번째 파라미터(매개변수)로 전달해줌
    //debugger; : 이 코드를 만나면 브라우저가 실행을 멈추고 크롬개발자도구에서 sources탭으로 이동함
    //e.preventDefault(); : 이벤트가 발생한 태그의 기본적인 동작을 막음. e객체에 기본적으로 속해있는 함수
    //a태그는 클릭하면 href주소로 페이지를 reload시킴. 이걸 막기 위해 e.preventDefault();사용
    //a태그를 클릭하면 mode가 read->welcome으로 바뀌도록 구현함
  }
}

export default App;