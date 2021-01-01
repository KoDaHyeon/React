## 1. 리액트는 어쩌다가 만들어졌을까

바닐라 JS로 이벤트핸들러를 통해 DOM을 직접 건드리면, 코드가 난잡해지기 쉬움.

따라서 Ember, Backbone, AngularjS등의 프레임워크가 만들어짐.

- 이 프레임워크들은 JS의 특정 값이 바뀌면 특정 DOM의 속성이 바뀌도록 연결을 해주어서, 업데이트 작업을 간소화해줌.

- 반면 리액트는, 상태가 바뀌면 DOM을 다 날려버리고 처음부터 새로 만들어서 보여줌.
  - 이러면 '업데이트를 어떻게 해야 할 지'에 대한 고민이 없을 것
  - 하지만 속도가 느릴것
    - 이걸 해결하기 위해 'Virtual DOM'을 도입

- **Vitual DOM**
  - 메모리에 가상으로 존재하는 DOM
  - <-> 브라우저에 실제로 보여지는 DOM
  - 그냥 JS 객체
  - 상태가 업데이트 되면, 업데이트가 필요한 곳의 UI를 Virtual DOM을 통해 렌더링 함. 그 후 실제 브라우저의 DOM과 비교를 한 후, 차이가 있는 곳을 감지하여 이를 실제 DOM에 패치시켜줌

<br>

<br>

## 2. 프로젝트 생성

#### 설치할 것들

- Yarn
  - 개선된 버전의 npm : 더 나은 속도, 더 나은 캐싱 시스템
  - Node.js를 설치할 때 같이 딸려오는 패키지 매니저 도구
  - 프로젝트에서 사용되는 라이브러리를 설치하고, 해당 라이브러리들의 버전을 관리할 때 사용
- Git bash
  - cmd 대용

<br>

#### 프로젝트 생성 및 시작

1. 프로젝트 폴더를 만들려는 위치에서

   ```
   $ npx create-react-app {프로젝트 폴더 이름}
   $ npx create-react-app begin-react
   ```

   를 입력하면 폴더가 생기고 그 안에 리액트 프로젝트가 생성됨.

2. cd명령어를 통해 프로젝트 폴더로 들어간 후

   ```
   $ yarn start  혹은
   $ npm start
   ```

   를 입력하면 자동으로 브라우저에 http://localhost:3000/ 가 열림.

<br>

<br>

## 3. 리액트 컴포넌트 생성

컴포넌트를 만들고 사용해보자.

1. src 디렉토리 밑에 Hello.js 파일을 생성

   ```jsx
   import React from 'react'; 
   //컴포넌트 생성 시 항상 React를 불러와야함
   
   //함수 형태로 컴포넌트를 작성하는 경우
   function Hello(){
     const name = 'hello'; //return밖에 자바스크립트 코드를 작성할 수도 있음
     return(
         //이 안에, 외부에서 Hello컴포넌트를 불러왔을 때 거기에 return할 내용이 들어감
         //JSX
     );
   }
   
   export default Hello;
   //Hello 컴포넌트를 내보내겠다.
   //이걸 써줘야 외부에서 Hello 컴포넌트를 불러올 수 있음
   ```

2. App.js에서 Hello 컴포넌트를 불러오기

   ```jsx
   import React from 'react';
   import Hello from './Hello';
   // ./Hello.js파일에서 Hello 컴포넌트를 import -> 이제 Hello 컴포넌트를 사용할 수 있음
   // 뒤에 .js는 빼도 됨
   // Hello 컴포넌트는 여러번 재사용 가능
   
   function App(){
       return(
         <>
           <Hello />
           <Hello />
         </>
       );
   }
   ```

3. App 컴포넌트를 **src/index.js**에서 실제 브라우저의 DOM에 렌더링함

   ```jsx
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
     //id가 root인 DOM은 현재 ../public/index.html에 있음. 여기에 리액트 컴포넌트가 렌더링되는 것임!
   );
   
   reportWebVitals();
   ```

<br>

<br>

## 4. JSX

리액트 컴포넌트를 작성할 때 JSX를 통해 작성.

 JSX 를 비롯한 새로운 자바스크립트 문법들을 사용하기 위해서 우리는 **Babel** 이라는 도구를 사용.

Babel이 JSX를 JavaScript로 변환해줌.

<br>

#### JSX 작성시 문법

- 태그는 꼭 닫아줘야 함. 무조건 />로 끝나야 함.

  - ```jsx
    <div>
     내용 어쩌구저쩌구
    </div>
    ```

<br>

- 태그와 태그 사이에 내용이 들어가지 않을 때는, Self Closing태그를 사용.

  - ```jsx
    <Hello />
    ```

<br>

- 두 개 이상의 태그는 반드시 하나의 태그로 감싸져야 함

  - ```jsx
    function App(){
      return(
        <div>
          <div>안녕히계세요</div>
          <Hello />
        </div>
       );
    }
    ```

  - div로 감싸는게 좋지 않은 상황 : 스타일 관련 설정을 하다가 복잡해지게 되는 상황, table 관련 태그를 작성 할 때

    ```jsx
    //Fragment를 사용해 태그를 감싼다
    //Fragment는 브라우저 상에서 별도의 엘리먼트로 나타나지 않음
    function App(){
      return(
        <>
          <div>안녕히계세요</div>
          <Hello />
        </>
       );
    }
    ```

<br>

- JSX 내부에 자바스크립트 변수를 보여줘야 할 땐 {}으로 감싸서 보여줌

  - ```jsx
    import React from 'react';
    import Hello from './Hello';
    
    function App(){
        const name = 'react';
        return(
          <>
            <Hello />
            <div>{name}</div>
          </>
        );
    }
    export default App;
    ```

<br>

- JSX 태그의 style 설정 : 인라인 스타일은 객체 형태로 작성

  - ```jsx
    import React from 'react';
    import Hello from './Hello';
    
    function App(){
        const name = 'react';
        const style = { //style을 객체형식으로 작성
            backgroundColor: 'black', 
            //CSS문법에선 background-color 였음. 하지만 JSX에선 -를 사용하던 속성이름들을 이런식으로 작성해줘야함.
            color: 'aqua',
            fontSize: 24, //단위는 px
            padding: '1rem' //다른 단위 사용시 문자열로 설정
        }
        
        return(
          <>
            <Hello />
            <div style={style}>{name}</div> //인라인으로 style지정한 경우
          </>
        );
    }
    export default App;
    ```

<br>

- JSX 태그에 CSS의 클래스를 적용시킬때는 className="클래스이름"

  - ```jsx
    import React from 'react';
    import './App.css'; //CSS파일을 로드
    
    
    function App() {
      return (
        <>
          <div className="gray-box"></div>
        </>
      );
    }
    
    export default App;
    ```

    - CSS파일에서 클래스에 대한 스타일은 **.클래스이름{}** 으로 정의

<br>

- 주석

  - JSX 내부의 주석은 **{/*  주석 내용  */}** 형태로 작성

  - 열리는 태그 내부에서는 **//주석 내용** 형태로도 작성 가능

    - ```jsx
      return (
          <>
            {/* 화면에 보이지 않음 */}
            /* 중괄호로 감싸지 않으면 화면에 보임 */
            <Hello 
              // 열리는 태그 내부에서는 이렇게 주석 작성 가능
            />
            <div style={style}>{name}</div>
            <div className="gray-box"></div>
          </>
        );
      ```

      