## 18. useCallback

### useCallback 함수

- React Hooks에서 제공하는 API

- react 패키지에서 불러와야 사용 가능

  ```jsx
  import React, {useCallback} from 'react';
  ```

- ```jsx
  useCallback( 함수, deps배열 )
  ```

  - 함수 : 컴포넌트 리렌더링 시, deps 배열의 특정 값이 바뀌면 재선언할 함수
  - deps배열 : 컴포넌트 리렌더링 시, **검사하고자 하는 props/상태**
    - **함수 안에서 사용하는 props/상태**,
    - **props로 받아온 함수**는 반드시 deps 에 넣어야 함
    - 그렇지 않으면 함수 안에서 해당 값들을 참조할 때 가장 최신 값을 참조할거라는 보장이 없음

- 예시

  ```jsx
  const onRemove = useCallback(
    id => {
      setUsers(users.filter(user => user.id !== id));
    }, //함수
    [users] //deps배열. users의 값이 변할때만 함수 재정의
  );
  ```

  

- 사용 이유
  - 컴포넌트 리렌더링 시 함수가 쓸데없이 재정의될 수 있음
  - 이를 막기 위해 deps배열 속 값들이 변할 때만 함수를 재정의하도록 지정할 수 있음
  - 즉 useCallback = 함수를 위한 useMemo