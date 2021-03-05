## 17. useMemo

### useMemo 함수

- React Hooks에서 제공하는 API

- react 패키지에서 불러와야 사용 가능

  ```jsx
  import React, {useMemo} from 'react';
  ```

- ```jsx
  const a = useMemo( 함수, deps배열 );
  ```

  - 함수 : 컴포넌트 리렌더링 시, deps 배열의 특정 값이 바뀌면 실행할 함수
  - deps 배열 : 컴포넌트 리렌더링 시, **검사하고자 하는 상태/props**

- 동작

  - 컴포넌트의 상태가 바뀌면 컴포넌트 함수가 재호출됨(=컴포넌트가 리렌더링 됨)
  - 이때 useMemo의 deps배열 속 특정 값이 바뀐 상태면, 함수를 실행해 return값을 a에 할당
  - 이때 useMemo의 deps배열 속 특정 값이 바뀌지 않은 상태면, 그냥 기존 a값을 그대로 사용
    - a 값은 메모리에 저장해둠
    - useMemo = "memoization"

- 예시

  ```jsx
  function MyComponent({x,y}){
    const z = useMemo(() => compute(x,y), [x,y]);
    //x나 y가 바뀌었을 경우 compute함수 실행후 z 업데이트
    //x와 y가 그대로인 경우 기존 z값 그대로 사용
    return <div>{z}</div>
  }
  ```

  ```jsx
  const count = useMemo(() => countActiveUsers(users), [users]);
  ```

- 사용 이유

  - 상태값이 변할 때마다 컴포넌트가 리렌더링되기 때문에, 불필요하게 업데이트되는 값(같은 값으로 업데이트)이 있을 수 있음
  - 이를 막기 위해 특정 값(users)이 변할 때만 값(count)을 업데이트하도록 지정할 수 있음
  - 이러면 메모리에 저장해둔 값을 **재활용**할 수 있기 때문에 효율적임