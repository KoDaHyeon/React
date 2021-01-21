## 7. useState를 통해 값 업데이트 하기

#### useState 함수

- React Hooks에서 제공하는 API
  - **Hooks** : 함수형 컴포넌트에 state를 제공함으로써 상태 관련 로직의 재사용을 이전보다 훨씬 쉽게 만들어줌
    - useState(), useEffect(), useRef() 등을 제공

- react 패키지에서 불러와야 사용 가능

  ```jsx
  import React, {useState} from 'react';
  ```

- 파라미터로 상태의 기본값을 넣어 호출해주면, 배열이 반환됨.

  - 배열의 0번째 원소 : 상태

  - 배열의 1번째 원소 : 상태에 대한 Setter 함수

  - ```jsx
    const [number, setNumber] = useState(0);
    //배열 비구조화 할당
    //number: 현재상태, setNumber: number에 대한 Setter함수
    ```

    ```jsx
    //위와 같다(배열 비구조화 할당을 하지 않은 코드)
    const numberState = useState(0);
    const number = numberState[0];
    const setNumber = numberState[1];
    ```

<br>

- Setter함수의 파라미터로 **새로운 값**을 주는 경우

  ```jsx
  setNumber(number+1);
  //number을 number+1이라는 새로운 값으로 업데이트함
  //파라미터로 '그 다음 상태'를 넣어줌
  ```

- Setter함수의 파라미터로 **함수**를 주는 경우 : **함수형 업데이트**

  ```jsx
  setNumber(prevNumber => prevNumber-1);
  //파라미터:prevNumber, return값:prevNumber-1 인 함수를 파라미터로 줌
  //파라미터로 '값을 업데이트하는 함수'를 넣어줌
  ```

  - **컴포넌트를 최적화할 때 사용**
    - 파라미터(prevNumber)에서 최신 상태값을 참조할 수 있음
    - 따라서 useCallback을 적용한 함수의 경우, deps배열에 굳이 이 상태를 넣지 않아도 됨
      - useCallback : deps배열안에 있는 값이 바뀌면 함수를 재정의함
    - 예시 : 벨로퍼트 19강(https://react.vlpt.us/basic/19-React.memo.html)
      - 문제점 : useCallback 적용한 함수(onChange, onToggle, onRemove)의 deps배열 안에 users(상태)가 있어서, **하나의 User컴포넌트를 수정하면** users가 바뀌어 함수가 재정의됨. 그래서 **그 함수를 props로 받는 모든 컴포넌트(CreateUser, 모든 User)가 리렌더링됨.** 이는 비효율적! 
      - 해결 : 함수형 업데이트(set상태 함수의 파라미터로 함수를 줌)를 통해 이를 해결. 함수형 업데이트를 사용하면, useCallback을 적용한 함수의 deps배열 안에 그 상태가 없어도 함수가 최신 상태값을 참조할 수 있음. 따라서 users가 수정돼도 함수가 재정의되지 않아 그 함수를 props로 받는 컴포넌트들도 리렌더링 되지 않음.
      - 결과 : User컴포넌트 하나를 수정하면 **그 컴포넌트만 리렌더링됨.**

- 두 방법의 차이

  - Setter함수의 파라미터로 **새로운 값**을 주는 경우

    ```jsx
    const [number, setNumber] = useState(0);
    
    const onClick = () => {
      setNumber(number+ 1);
      setNumber(number+ 1);
    }
    ```

    - number=0인 상태에서 onClick 함수가 한번 호출되면 number=1이 됨
    - 즉 number가 1씩 증가함

  - 함수형 업데이트

    ```jsx
    const [number, setNumber] = useState(0);
    
    const onClick = () => {
      setNumber(prevNumber=> prevNumber+ 1);
      setNumber(prevNumber=> prevNumber+ 1);
    }
    ```

    - number=0인 상태에서 onClick 함수가 한번 호출되면 number=2가 됨
    - 즉 number가 2씩 증가함
    - 함수형 업데이트는 **상태값 변경을 배치로 처리함**

<br>

- 리액트 컴포넌트는 내부 상태(state)가 변할 때 마다 리랜더링됨

<br><br>

예시

- App.js

  ```jsx
  import React from 'react';
  import Counter from './Counter';
  
  function App() {
  
    return (
      <Counter />
    );
  }
  
  export default App;
  ```

- Counter.js

  ```jsx
  import React, {useState} from 'react';
  
  function Counter(){
    const [number, setNumber] = useState(0);
  
    const onIncrease = () => {
      console.log('+1'); //브라우저에서 f12누르면 뜨는 Console탭에 기록됨
      setNumber(number+1); //number+1이라는 새로운 값을 파라미터로 넣어줌
    }
    
    const onDecrease = () => {
      console.log('-1');
      setNumber(prevNumber => prevNumber -1); //함수형 업데이트. 
      //값을 업데이트하는 함수(파라미터:prevNumber, return:prevNumber-1)를 파라미터로 넣음
    }
    
    return(
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    );
  }
  
  export default Counter;
  ```

  - on이벤트이름={실행할함수이름}

    - ```jsx
      <button onClick={onIncrease}>+1</button>
      ```

    - '실행할함수이름'만 넣어줘야 함

    - onIncrease()이렇게 괄호까지 넣으면 렌더링되는 시점에 함수가 호출되버림.

  - cf) 실행할 함수가 **파라미터를 받아올 때**는

    on이벤트이름={() => 실행할함수이름(파라미터)}

    ```jsx
    <button onClick={() => onRemove(user.id)}>삭제</button>
    ```

    - 이유 추측(그냥 내 추측임! 쉬운 암기를 위해 작성)

      - onClick={onRemove(user.id)}라고 하면 렌더링시 onRemove가 바로 호출되어버림

      - onClick={() => onRemove(user.id)}라고 하면 이벤트가 일어날 때 {}속 함수가 호출되기 때문에 onRemove함수가 호출됨

<br>

---

참고

화살표 함수 : https://learnjs.vlpt.us/basics/05-function.html#%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98

비구조화 할당: https://learnjs.vlpt.us/useful/06-destructuring.html#%EB%B0%B0%EC%97%B4-%EB%B9%84%EA%B5%AC%EC%A1%B0%ED%99%94-%ED%95%A0%EB%8B%B9