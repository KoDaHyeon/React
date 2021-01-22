## React.memo()

- 컴포넌트의 **최적화**를 위함
- 컴포넌트가 받아오는 **props가 바뀌었을 때만** 해당 컴포넌트를 리렌더링

<br>

### 사용 방법

최적화(props가 바뀌었을 때만 리렌더링)하고 싶은 컴포넌트함수를 React.memo()의 인자로 주면 됨.

이때 인자 형태에 따라, 이전 props와 현재 props를 비교하는 방식이 다를 수 있음.

<br>

#### 얕은 비교

- React.memo는 기본적으로 props를 비교할 때 이전 props와 현재 props에 대해 얕은 비교를 함
  
- 얕은 비교 : props객체의 원시형 값에 대해서는 같은 값을 가지는지(1이 1과 같은지, true는 true와 같은지), 배열이나 객체같은 복잡한 값에 대해서는 참조하고 있는 객체가 같은지 확인
  
- ```jsx
  const 컴포넌트함수이름 = React.memo(
    //컴포넌트함수 내용
  );
  ```

- ```jsx
  const 컴포넌트함수이름 = React.memo(function 컴포넌트함수이름(props){
    //컴포넌트함수 내용
  });
  ```

- ```jsx
  export default React.memo(컴포넌트함수이름);
  ```

<br>

#### 비교 함수를 직접 커스텀

- 비교방식을 커스텀(특정값만 비교 가능)하고 싶다면 React.memo()의 두 번째 매개변수로 비교함수를 주면 됨.

- 하지만 이 경우 함수의 props들 중에 상태(users)를 참조(매개변수로 받음)하는 함수가 있다면, 그 함수 속에서 상태를 업데이트할 때(setUsers) **함수형 업데이트를 사용해야 최신 상태를 참조**해서 오류가 일어날 가능성을 줄일 수 있음. 
  
- 벨로퍼트 19강 참고 : https://react.vlpt.us/basic/19-React.memo.html
  - useState.md 참고
  
- ```jsx
  export default React.memo(함수이름,비교함수);
  ```

  - 비교함수를 외부에 따로 정의

    ```jsx
    function MyComponent(props){ 
      //컴포넌트 내용
    }
    function areEqual(prevProps, nextProps){ 
      //prevProps:이전에 받았던 props, nextProps:현재 받은 props
      return(
        prevProps.title === nextMovie.title &&
        prevProps.releaseDate === nextProps.releaseDate
      );
    }
    export default React.memo(MyComponent, areEqual);
    ```

  - 비교함수를 React.memo의 두 번째 파라미터에 바로 정의

    ```jsx
    function MyComponent(props){ 
      //컴포넌트 내용
    }
    export default React.memo(
      MyComponent,
      (prevProps, nextProps) => prevProps.users === nextProps.users
    );
    ```

<br><br>

## 최적화

- **useCallback, useMemo, React.memo(), 함수형 업데이트**를 통해 최적화
- useCallback, useMemo, React.memo는 실제로 렌더링 최적화할 수 있는 컴포넌트에만 사용



