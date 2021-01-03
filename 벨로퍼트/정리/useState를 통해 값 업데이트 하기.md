## 7. useState를 통해 값 업데이트 하기

#### useState 함수

- react 패키지에서 불러와야 사용 가능

  ```jsx
  import React, {useState} from 'react';
  ```

- 파라미터로 상태의 기본값을 넣어 호출해주면, 배열이 반환됨.

  - 배열의 0번째 원소 : 현재 상태

  - 배열의 1번째 원소 : 현재 상태에 대한 Setter 함수

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

  - 컴포넌트를 최적화할 때 사용

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

<br>

---

참고

화살표 함수 : https://learnjs.vlpt.us/basics/05-function.html#%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98

비구조화 할당: https://learnjs.vlpt.us/useful/06-destructuring.html#%EB%B0%B0%EC%97%B4-%EB%B9%84%EA%B5%AC%EC%A1%B0%ED%99%94-%ED%95%A0%EB%8B%B9