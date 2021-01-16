## 16. useEffect

### useEffect 함수

- React Hooks에서 제공하는 API

- react 패키지에서 불러와야 사용 가능

  ```jsx
  import React, {useEffect} from 'react';
  ```

- ```jsx
  useEffect( 함수, deps배열 )
  ```

  - 함수 : useEffect가 호출될 때 수행하고자 하는 작업
  - deps배열 : **검사하고자 하는 상태/props** or **빈배열**
    - useEffect 안에서 사용하는 상태/props는 무조건 deps에 넣어주는 것이 규칙임
    - 그렇지 않으면 useEffect 안의 함수가 실행될 때 최신 상태, props를 가리키지 않음

- useEffect 실행 조건
  - 화면에  처음 떴을 때(컴포넌트가 마운트될때) 실행
  - deps에 넣은 파라미터값이 업데이트 됐을 때 실행
  - 화면에서 사라질 때(컴포넌트가 언마운트될때) cleanup 함수 실행
  - deps에 넣은 파라미터값이 업데이트 되기 직전 cleanup 함수 실행

<br>

#### deps 값에 따른 함수 호출

deps가

- 빈 배열인 경우 

  - 컴포넌트가 처음 마운트될 때 함수 호출
  - 컴포넌트가 언마운트될 때 cleanup 함수 호출

- 빈 배열이 아닌 경우

  - 컴포넌트가 처음 마운트될 때 함수 호출

  - 컴포넌트가 언마운트될 때 cleanup 함수 호출

  - 지정한 값이 바뀔 때 함수 호출

    - 지정한 값이 바뀔때 = deps배열 안에 작성한 상태/props의 값이 바뀔 때

    - 예시

      ```jsx
      useEffect(() => {
        console.log(name);
        console.log('마운트될 때, 업데이트 될 때 실행');
      }, [name]);
      ```

    - 지정한 값이 바뀔때만 함수를 실행하도록 하는 꼼수

      ```jsx
      const mounted = useRef(false);
      
      useEffect(() => {
        if(!monuted.current){
          mounted.current = true;
        }else{
          //상태/props가 update될 때 실행할 코드
        }
      }, [deps값들]);
      ```

  - 지정한 값이 바뀌기 직전 cleanup 함수 호출

- 생략한 경우

  - 컴포넌트가 리렌더링될 때 마다 useEffect 호출

    ```jsx
    useEffect(() => {
      console.log('렌더링될 때 마다 실행');
    });
    ```

    

<br>

#### cleanup 함수

- return 뒤에 나오는 함수
- **1) 컴포넌트가 언마운트될 때 2) deps가 빈배열이 아닐 경우 특정값이 업데이트되기 직전**에 실행

- 언마운트될 때만 cleanup함수를 실행하고 싶을 때

  - deps를 빈 배열로 한다

    ```jsx
    useEffect(() => {
      console.log('effect');
      console.log(name);
      return () => {
        console.log('cleanup');
        console.log(name);
      };
    }, []);
    ```

- 특정값이 업데이트 되기 직전에 cleanup함수를 실행하고 싶을 때

  - deps 안에 값을 넣어줌

