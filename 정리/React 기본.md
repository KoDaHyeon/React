## React



#### React란?

- facebook에서 만든 자바스크립트 라이브러리
- **컴포넌트** : 사용자가 정의해 만든 태그
  - 가독성이 좋다
    - 직접 치기 복잡한 코드를 간단하게 표현 가능
  - 재사용성이 좋다
  - 유지보수에 좋다
    - 컴포넌트의 코드를 한번만 수정하면 여러곳에서 사용된 컴포넌트가 모두 수정됨
- React 홈페이지 공식문서를 잘 활용해야 한다

<br><br>

#### 개발환경 설정

- create react app

  - **npm** : Node.js를 이용해 만든 앱들을 명령어 환경에서 쉽게 설치할 수 있도록 도와주는 도구

    ​      <br>

  - **npx** : create-react-app을 임시로 설치해서 딱 한번만 실행시키고 지우는 프로그램

    - react 홈페이지에서는 npx를 통한 create-react-app 사용 권장

    - 장점 : 최신버전의 create-react-app 사용 가능

    - 단점 : 매번 설치하기 귀찮음

      <br>

  - 설치 : cmd에서 $npm install -g create-react-app

    - -g : 어디에서든 실행할 수 있도록 함

    - 잘 설치됐는지, 버전 확인 : $create-react-app -V

      <br>

  - create react app의 개발환경 설정

    1. 개발환경으로 할 폴더 생성(react 라는 이름은 불가)

    2. cmd에서 $ cd [폴더경로]

       - 폴더를 cmd로 드래그하면 경로가 복붙됨

    3. 그 경로에서 $ create-react-app .

    4. 그 경로에서 $ npm start

       - 개발중인 웹페이지가 자동으로 뜸
    
   -   Local:            http://localhost:3000
           On Your Network:  http://192.168.0.13:3000

         가 cmd에 뜸

         - 내가 개발중인 웹앱을 확인할 수 있는 주소
    
    5. 실행을 종료하고 싶을 때 : $ Ctrl+C

<br><br>

#### 파일 설명

- visual studio code에서 react-app 디렉토리 탐방

  - **public \ index.html** : http://localhost:3000 페이지에 띄워지는 화면

    - ```js
      <dib id="root"></div>
      ```

      - 모든 컴포넌트들이 이 div안에 들어가야 함

      - 이 컴포넌트들의 소스코드는 src디렉토리 안에 있는 파일들

        <br>

  - **src \ index.js** : entry 파일

    - ```
      document.getElementById('root')
      ```

      위 div태그의 id와 이 문장의 괄호 안 string을 통일시켜야 함

    - ```js
       <React.StrictMode>
        <App />
       </React.StrictMode>
       //그냥 <App /> 만 써도 됨
      ```

      < App  /> : react를 통해 만든 App이라는 이름의 컴포넌트(사용자 정의 태그) 

      - 이 컴포넌트의 실제 구현은

        ```js
        import App form './App'; 
        ```

        을 통해 불러옴

        - './App' : index.js파일과 같은 디렉토리에 있는 App.js파일

        - 이때 import 뒤에오는 이름(App)==< App  />  이렇게 이름이 같아야 함

          <br>

  - **scr \ App.js** : App 컴포넌트가 실제 구현된 파일

    - App 클래스의 render 블록 안에 있는 코드가 실제 App 구현 코드

    - 컴포넌트를 구성하는 코드들은 반드시 return ()안에 **하나의 최상위 태그**안에 포함되어야 함

      ```js
      return(
      	<div className="App">이 안에 태그들이 모두 포함</div>
    );
      ```
    
      ```js
    return(
      	<header>
      		<h1>WEB</h1>
      	</header>
      );
      ```
  
    <br>
  
  - 파일 수정 후 저장하면 웹페이지를 자동으로 reload해줌
  
    <br><br>

#### Deploy(배포하는 법)

- React가 개발의 편의성을 위해 여러 기능들을 추가해놓아서 create react app의 개발환경은 파일 크기가 상당히 크다

- 따라서 production mode앱을 만들때(build할때)는 cmd에서 $npm run build

  - build 디렉토리가 생김
    - build\index.html파일을 보면 공백이 다 사라져있음
      - create react app이 실제 production 환경에서 사용되는 앱을 만들기 위해 이미 있는 index.html에서 불필요한 용량을 차지하는 정보를 다 지웠기 때문
    - 실제로 배포할때는 build디렉토리 안에 있는 파일을 사용

- cmd에서 $npm install -g serve

  - 컴퓨터 어디에서나 serve명령어를 통해 웹서버 설치를 가능하도록 해줌

- cmd에서 $npx serve -s build 

  - 한번만 실행시킬 웹서버를 다운(npx serve)받아서, 실행시킬때 build디렉토리를 root로 하겠다(-s build)

  -    │   - Local:            http://localhost:5000 
     │
     │   - On Your Network:  http://192.168.0.13:50

     이렇게 주소를 줌

     이 주소로 들어간 후 개발자도구-Network탭-파일 크기를 보면 build안한 파일보다 훨씬 줄어든 걸 확인 가능