## props와 state

- <img src="https://user-images.githubusercontent.com/43772750/89905628-608d6000-dc25-11ea-9e47-865002af123c.png" alt="img " style="width:300" />
- props와 state는 철저히 분리되어야 한다

<br>

<br>

## props ##

- 부모 구성 요소로부터 전달된 속성(property)
  - 부모 컴포넌트가 자식 컴포넌트에 전달하는 값
- 불변 데이터
  - 읽기 전용
  - 변경 불가

- 사용자는 태그의 속성값(props)를 통해 컴포넌트를 조작할 수 있음

  <br><br>

## state

- 컴포넌트 자기 자신이 가지고 있는 **상태**값

- props값에 따라 내부 구현에 필요한 데이터들
- 가변 데이터
- 사용자는 알 필요도 없고 알면 안되는, 컴포넌트 내부적으로 사용되는 것

- state값 설정

  - 컴포넌트가 생성될 때 최초로 실행되는 생성자 함수에서는 state값을 직접 설정할 수 있음

    - ```jsx
       constructor(props){ 
          super(props);
          this.state = { //state값을 초기화
            mode:'read', 
            subject:{title:'WEB', sub:'World Wide Web!'}, 
            welcome:{title:'Welcome', desc:'Hello, React!!'},
            contents:[ 
              {id:1, title:'HTML', desc:'HTML is for information'}, 
              {id:2, title:'CSS', desc:'CSS is for design'},
              {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
            ]
          }
        } 
      ```

  <br>

  - 컴포넌트가 이미 생성된 후 state값을 변경할 때는 state값을 직접 설정하면 React가 render함수를 호출하지 않음

    - this.setState({변경할 객체}); 를 통해 변경해야 함

      ```jsx
      this.setState({mode:'welcome'}); 
      //this.state.mode를 'welcome'으로 변경
      ```

<br>

<br>

## 예시 ##

- ```jsx
  /*App.js*/
  
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
  
  ```

  ```jsx
  /*index.js*/
  
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
  ```

  ```jsx
  /*TOC.js*/
  
  import React, {Component} from 'react';
  
  class TOC extends Component{
      //TOC는 this.props.data를 받은 상태
  
      render(){
        var lists=[]; //ul태그로 묶을 li태그들을 넣을 배열
        var data=this.props.data; //부모 컴포넌트(App)에서 보내온 props를 받아 변수data에 넣음
        var i=0; //반복문을 props의 data길이(배열요소의 개수)만큼 반복
        while(i<data.length){
          lists.push(<li key={data[i].id}><a href={"/content/"+data[i].id}>					{data[i].title}</a></li>); 
          //lists.push : li태그가 하나씩 생성돼서 list에 담김
          //App의 state값을 수정해도 TOC.js의 로직을 수정하지 않아도 됨
          //key={data[i].id} : 여러개의 목록을 자동생성할때 key라는 props가 없으면 오류가 뜸
          //key값은 각 목록을 구별할 수 있도록 하는 것. 내가 사용할 값은 아니고 react가 내부적으로 필요해서 요청하는 값 
          i=i+1;
        }
        return(
          <nav>
            <ul>
              {lists}
            </ul>
          </nav>
        );
      }
    }
  
    export default TOC; 
  ```

  

<br><br>

## 참고 ##

https://studyingych.tistory.com/52