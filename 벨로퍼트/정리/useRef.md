## 10. useRef

#### useRef 함수

- React Hooks에서 제공하는 API

- react 패키지에서 불러와야 사용 가능

  ```jsx
  import React, {useRef} from 'react';
  ```

- 특정 DOM을 선택할 수 있게 함

  - cf) JavaScript에서는 getElementById 같은 DOM Selector함수로 특정 DOM을 선택

- 사용 예시

  - 특정 엘리먼트의 크기를 가져올 때
  - 스크롤바 위치를 가져올 때
  - 포커스를 설정할 때
  - 외부 라이브러리를 특정 DOM에 적용할 때

<br><br>

예시

- InputSample.js

  ```jsx
  import React, {useState, useRef} from 'react';
  
  function InputSample(){
    const [inputs, setInputs] = useState({
      name: '',
      nickname: ''
    });
  
    const nameInput = useRef();
    
    const {name, nickname} = inputs;
  
    const onChange = (e) => {
      const{value, name} = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    };
  
    const onReset = () => {
      setInputs({
        name: '',
        nickname: ''
      });
      nameInput.current.focus(); 
      //nameInput.current: 원하는 DOM을 가리킴, focus:DOM API(해당 DOM에 포커스함)
    };
  
    return(
      <div>
        <input 
        name="name" 
        placeholder="이름" 
        onChange={onChange} 
        value={name}
        ref={nameInput}
        //선택하고 싶은 DOM의 ref값으로 Ref객체(nameInput)를 설정 -> Ref객체의 .current값이 해당 DOM을 가리킴
        /> 
        <input 
        name="nickname" 
        placeholder="닉네임" 
        onChange={onChange} 
        value={nickname} />
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

  - **useRef 함수**

    ```jsx
    const nameInput = useRef();
    ```

    - useRef는 current 속성을 가진 Ref 객체(=nameInput)를 반환함
    - 파라미터로 넘어온 초기값을 current 속성에 할당함
    - current 속성의 값을 변경해도 컴포넌트가 리랜더링 되지 않음
    - 컴포넌트가 리랜더링돼도 current 속성의 값이 날라가지 않음

    #### 사용

    1. **useRef함수**를 호출해서 Ref 객체를 생성

       ```jsx
       const nameInput = useRef();
       ```

    2. 선택하고 싶은 DOM 태그에 **ref** 속성값으로 Ref 객체를 설정

       ```jsx
       <input ref={nameInput} />
       ```

    3. 선택한 DOM에 대해 뭔가를 하고 싶을 때 **Ref객체이름.current** 로 DOM을 가리킬 수 있음

       ```jsx
       nameInput.current.focus();
       ```

       