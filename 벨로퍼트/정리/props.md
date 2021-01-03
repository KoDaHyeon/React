## 5. props

props는 properties의 줄임말임.

어떠한 값을 컴포넌트에게 전달해줘야 할 때, props를 사용.

<br>

### props를 전달하는 방법

#### 1. props.이름

- App.js

  ```jsx
  import React from 'react';
  import Hello from './Hello';
  
  function App(){
    return(
      <Hello name="react" color="red" />
      //Hello 컴포넌트에 name, color값을 전달
    );
  }
  export default App;
  ```

- Hello.js

  ```jsx
  import React from 'react';
  
  //Hello컴포넌트를 사용하는 외부에서 전달해준 props값을 '객체형태'로 받아옴
  function Hello(props){
    return(
      <div style={{color: props.color}}>안녕하세요 {props.name}</div>
      //props객체의 name값을 조회하려면 props.name으로 조회
    );
  }
  
  exports default Hello;
  ```

  - props는 객체 형태로 전달됨
  - props라는 객체안에 name과 color(키: 값)가 있음
  - style={{color: props.color}}
    - jsx코드 내부에서 js의 변수를 사용할 땐 {}안에 js변수를 적어야 함
    - 만약 Hello 함수 안에 style객체를 생성해서 div태그에 style를 적용하려면 style={style}
    - 근데 여기선 style객체 대신 {color: props.color}라는 객체를 일회성으로 만들어 style로 적용

<br>

#### 2. 비구조화 할당

여러개의 props를 전달할 때 용이

- Hello.js

  ```jsx
  import React from 'react';
  
  function Hello({color, name}){
    //color = props.color, name = props.name
    return(
      <div style={{color}}>안녕하세요 {name}</div>
    );
  }
  
  exports default Hello;
  ```

  - 함수의 파라미터에서 비구조화 할당을 적용

    ```jsx
    function Hello({color, name})
    //props객체의 키 color, name에 해당하는 값을 변수 color, name에 넣어줌
    //이제 color, name은 변수 혹은 상수처럼 사용 가능
    //{name, color} 처럼 순서를 바꿔도 상관 없음
    ```

- defaultProps로 기본값 설정

  컴포넌트에 props를 지정하지 않았을 때 기본적으로 사용할 값을 설정할 수 있음

  ```jsx
  import React from 'react';
  
  function Hello({ color, name }) {
    return <div style={{ color }}>안녕하세요 {name}</div>
  }
  
  Hello.defaultProps = {
    name: '이름없음'
  }
  
  export default Hello;
  ```

  - **컴포넌트이름.defaultProps** 객체를 생성
  - 외부에서 Hello컴포넌트에 props값을 전달할 때 name에 값을 지정하지 않으면 '이름없음'이 사용됨

<br>

#### 3. props.children

- props.children
  - props를 넘겨주는 컴포넌트(App.js)에서 props값을 지정한 컴포넌트(Hello.js)를 렌더링
  - Wrapper.js에 종속된 컴포넌트(Hello.js)의 값이 바뀌어도 Wrapper.js는 수정할 필요 없음
- props
  - props를 넘겨받는 컴포넌트(Hello.js)가 직접적으로 언급돼서 쓰이는 곳(App.js)에서 props값을 전달

예시)

-  App.js

  ```jsx
  import React from 'react';
  import Hello from './Hello';
  import Wrapper from './Wrapper';
  
  function App() {
    return (
      <Wrapper>
        <Hello name="react" color="red"/>
        <Hello color="pink"/>
      </Wrapper>
    );
  }
  
  export default App;
  ```

- Hello.js

  ```jsx
  import React from 'react';
  
  function Hello({ color, name }) {
    return <div style={{ color }}>안녕하세요 {name}</div>
  }
  
  Hello.defaultProps = {
    name: '이름없음'
  }
  
  export default Hello;
  ```

- Wrapper.js

  ```jsx
  import React from 'react';
  
  function Wrapper({children}){
      const style = {
          border: '2px solid black',
          padding: '16px'
      };
      return(
        <div style={style}>
          {children}  
        </div>
      );
  }
  ```

  ```jsx
  //위와 같음
  import React from 'react';
  
  function Wrapper(props){
      const style = {
          border: '2px solid black',
          padding: '16px'
      };
      return(
        <div style={style}>
          {props.children}  
        </div>
      );
  }
  ```

  