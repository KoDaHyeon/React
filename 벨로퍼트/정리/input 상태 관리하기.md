## 8. input 상태 관리하기

예시

- App.js

  ```jsx
  import React from 'react';
  import InputSample from './InputSample.js';
  
  function App() {
  
    return (
      <InputSample />
    );
  }
  
  export default App;
  ```

- InputSample.js

  ```jsx
  import React, {useState} from 'react';
  
  function InputSample(){
    const [text, setText] = useState('');
    //useState('')이니 text는 string형
    //cf) 만약 useState(0)이라면 text는 int형이었을 것
  
    const onChange = (e) => {
      setText(e.target.value);
    };
  
    const onReset = () => {
      setText('');
    };
      
    return(
      <div>
        <input onChange={onChange} value={text} />
        <button onClick={onReset}>초기화</button>
        <div>
          <b>값: {text}</b>
        </div>
      </div>
    );
  }
  
  export default InputSample;
  ```
  
  - **on이벤트이름={실행할함수이름}**
  
    - 이벤트가 일어나면 함수가 실행됨
  
    - **onChange**
  
      : 내용에 변화가 일어나면 지정한 함수가 실행됨
  
        ```jsx
        <input onChange={onChange} value={text} />
        //input의 입력란에 변화가 일어나면 onChange함수가 실행됨
        
        //value = 렌더링될때 초기값
        //value={text+1}이라고 두면, 2를 입력했을 때 onChange함수에 의해 text=2가 되어 리렌더링될 때, input의 초기값 value={2+1}이므로 '21'이 입력란에 표시됨
      //초기화 버튼을 누르면 onReset이 호출돼 text=''이 되어 리렌더링될 때, value=''이 되어 입력란이 비워짐 
        ```
  
  - 이벤트에 등록하는 함수는 이벤트 객체 e를 파라미터로 받아올 수 있음
  
    ```jsx
    const onChange = (e) => {
        setText(e.target.value);
    }
    //input 입력란에 변화가 일어나 onChange함수가 실행될때 이벤트객체 e가 파라미터로 넘어감
    //e.target == 이벤트가 발생한 DOM(즉 input DOM)
    //e.target.value == input DOM에 입력한 값
    //e.target.value값으로 text의 값을 업데이트함
    ```
  
  
    - input
  
      ```jsx
      <input />
      ```
  
      - 텍스트를 입력하는 입력란

<br>

<br>

## 9. 여러개의 input 상태 관리하기

- 각 input태그의 상태를 useState를 통해 여러개의 변수로 두고, 각 상태에 대한 onChange를 둘 수도 있지만, 별로 좋은 방법은 아님.

- **input태그 각각에 name을 설정하고, name값을 통해 특정 input태그의 상태만 업데이트할 수 있도록 함.**

<br>

예시

- InputSample.js

  ```jsx
  import React, {useState} from 'react';
  
  function InputSample(){
    const [inputs, setInputs] = useState({
      name: '',
      nickname: ''
    });
    //inputs는 키가 name, nickname인 객체
    //배열 비구조화 할당
  
    const {name, nickname} = inputs;
    //name = inputs.name
    //nickname = inputs.nickname
    //객체 비구조화 할당
  
    const onChange = (e) => {
      const{value, name} = e.target;
      //e.target은 input DOM 객체
      //value=input의 속성 value, name=input의 속성 name
      setInputs({
        ...inputs, //spread문법. inputs객체의 내용을 펼쳐서 복사함
        [name]: value //name(e.target.name)키의 값을 value(e.target.value)로 함
        				//name="name" 혹은 "nickname"
      });
    };
  
    const onReset = () => {
      setInputs({
        name: '',
        nickname: ''
      });
    };
  
    return(
      <div>
        <input name="name" placeholder="이름" onChange={onChange} value={name} />
        <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
        <button onClick={onReset}>초기화</button>
        <div>
          <b>값: </b>
          {name} ({nickname})
        </div>
      </div>
    );
  }
  
  export default InputSample;
  ```

  - 리액트에서 상태 객체를 수정할 때

    - 객체를 직접 수정하면 안됨

      - 객체의 불변성을 유지하기 위함
  
      ```jsx
    inputs[name] = value; //(x)
      ```

    - **새로운 상태의 객체를 따로 만들어서, 이 객체를 상태로 지정해줘야 함**
  
      ```jsx
      setInputs({
        ...inputs, //기존 inputs객체를 펼쳐서 복사(spread)
        [name]: value //객체 수정
      });
    //이 새로운 객체로 상태를 지정해줘야 함
      ```

  - **spread 문법**

    - 객체/배열을 '펼쳐서' 복사해옴(객체/배열의 내용을 복사해온다고 생각)
  
    - ```jsx
    ... 객체/배열이름
      ```

    - 참고 : https://learnjs.vlpt.us/useful/07-spread-and-rest.html

  - placeholder 속성

    - input 입력란에 아무것도 입력되지 않았을 때 디폴트로 쓰여져있는 문구

  - value 속성
  
  - input 입력란이 렌더링될 때 입력되어있는 초기값
    - placeholder는 뭔가를 입력하면 자동으로 없어지지만, value는 직접 지워야함

  - 메커니즘
  
    1. name="name"인 input란에 '고'가 쓰여짐 -> e.target.value='고'
    2. 변화를 onChange가 감지해서 onChange함수 호출
    3. 비구조화 할당에 의해 value=e.target.value, name=e.target.name
    4. inputs를 setInputs를 통해 만든 새 객체로 바꿔치기함
  5. 리렌더링되어 (=InputSample 함수가 다시 호출됨) 바뀐 {name}, {nickname}이 적용됨
    6. name="name"인 input란('고'가 쓰여진 상태)에 '다'가 쓰여짐-> e.target.value='고다'
  
       ...