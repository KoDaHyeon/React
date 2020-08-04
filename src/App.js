import React, {Component} from 'react';
import './App.css'; //App.js안에 있는 컴포넌트가 load됐을 때 App.css도 같이 load됨
                    //App컴포넌트의 디자인

class Subject extends Component { //클래스 이름은 대문자로 시작
                                  //Subject라는 이름의 컴포넌트 정의
  render(){ //자바스크립트에서 클래스 안에 소속된 함수는 function키워드를 생략(function render이 아님)
    return ( //괄호 안 태그들은 모두 '하나의 최상위 태그'안에 포함되어야 함
      <header> 
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    ); 
    //this:객체지향에서 현재 객체, props:속성, title,sub:변수같은 느낌(어떤 이름이든 가능)
    /* 그냥 <h1>WEB</h1>
            world wide web!
       라고 쓰는 것 보다 훨씬 효율적!
       Subject 컴포넌트가 언제나 똑같은 값을 갖는게 아니라 title, sub의 입력값이 뭐냐에 따라
       다른 결과를 출력할 수 있기 때문
    */
  }
}

class TOC extends Component{
  render(){
    return(
      <nav>
        <ul>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
          <li><a href="3.html">JavaScript</a></li>
        </ul>
      </nav>
    );
  }
}

class Content extends Component{
  render(){
    return(
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class App extends Component { //React가 제공하는 Component클래스를 상속받아 App 클래스 정의
                              //App이라는 이름의 컴포넌트 정의
  render(){ //render 메소드
    return ( //괄호 안 태그들은 모두 '하나의 최상위 태그'안에 포함되어야 함
             //React가 웹브라우저에게 컴포넌트의 html코드를 제공해줌
      <div className="App"> 
        <Subject title="WEB" sub="world wide web!"></Subject>
        <Subject title="React" sub="for UI"></Subject>
        <TOC></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    ); //Subject, TOC, Content컴포넌트 사용
  }
}
//위 코드는 페이스북에서 만든 jsx라는 언어
//자바스크립트 문법과 조금 다름
//jsx코드를 create react app이 js코드로 변환해줌

export default App;