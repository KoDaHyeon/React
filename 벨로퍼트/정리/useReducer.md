## 20. useReducer

### useReducer 함수

- React Hooks에서 제공하는 API

- react 패키지에서 불러와야 사용 가능

  ```jsx
  import React, {useReducer} from 'react';
  ```

- **상태(state) 관리**에 사용

  - 상태관리에 사용되는 함수 : useState, useReducer
  - 컴포넌트에서 관리하는 값이 많아서 상태의 구조가 복잡할 때, useState보다 사용하기 유리
    - 하나의 컴포넌트 함수에서 setter를 여러 번 사용해야 하는 일이 발생할 때는 useState보다는 useReducer가 유리할 수 있음
  - 여러 개의 상태값을 하나의 상태 객체로 합치고 키값으로 분류하는게 좋음

- 컴포넌트의 상태 업데이트 로직을 **컴포넌트에서 분리시킬 수 있음**

  - 컴포넌트 함수 밖에다가 reducer함수 선언

<br>

#### 사용법

- ```jsx
  const [상태, dispatch함수] = useReducer(reducer함수, 초기상태);
  ```

  - 예시

    ```jsx
    const [state, dispatch] = useReducer(reducer, initialState);
    ```

  - 컴포넌트 함수 내에 선언

- **초기상태**

  - 초기 상태 객체를 컴포넌트 함수 외부에 선언

  - 상태 객체의 초기값이 됨

  - 상태값이 여러 개일 땐 하나의 상태 객체로 합치고 키값으로 분류하는게 좋음

  - 예시

    ```jsx
    const initialState = {
      inputs: {
        username: '',
        email: ''
      },
      users: [
        {
          id: 1,
          username: 'velopert',
          email: 'public.velopert@gmail.com',
          active: true
        },
        {
          id: 2,
          username: 'tester',
          email: 'tester@example.com',
          active: false
        },
        {
          id: 3,
          username: 'liz',
          email: 'liz@example.com',
          active: false
        }
      ]
    };
    ```

    - 상태값 종류는 inputs, users 2개임

- **reducer 함수**

  - `(현재 상태, action객체)`를 파라미터로 받아서 새로운 상태 객체를 반환하는 함수

    - action객체의 type에 따라 상태가 어떻게 변해야 하는지를 정의
    - 컴포넌트 함수 외부에 선언
    - action객체의 키값에 접근할 때는, `action.키이름`으로 접근

  - 예시

    ```jsx
    function reducer(state, action){
      switch(action.type){
        case 'CHANGE_INPUT':
          return{ //새로운 state객체를 반환
            ...state, //객체의 불변성을 위해 객체를 직접 수정하지 않고, spread문법을 통해 내용을 복사해 새로운 객체를 생성 후 값을 수정
            inputs: {
              ...state.inputs,
              [action.name]: action.value
            }
          };
        case 'CREATE_USER':
          return{
            inputs: initialState.inputs,
            users: state.users.concat(action.user)
          };
        default:
          return state;
      }
    }
    ```

- **dispatch 함수**

  - 컴포넌트 내에서 상태변경을 일으키기 위해 사용

    - useState의 setState함수와 유사한 역할. 사용법도 비슷.

  - `reducer 함수에 넘길 action 객체`를 파라미터로 받음

    - dispatch함수에 action객체를 파라미터로 넘기면, reducer함수가 이 action객체에 따라 상태를 변경해줌(새로운 상태를 반환)

    - ```jsx
      dispatch(액션객체);
      ```

  - 예시

    ```jsx
    const onChange = useCallback(e => {
      const{name, value} = e.target;
      dispatch({
        type:'CHANGE_INPUT',
        name, //name:name
        value //value:value
      });
    }, []);
    ```

- **action 객체** 

  - 관행적으로 어떤 부류의 행동인지를 나타내는 **type 속성, 해당 행동과 관련된 데이터**를 담고 있음

  - 관행적으로 type 키는 **대문자,_**로 작성
    - type 키 이름은 이 action객체가 어떤 행동을 하는지 나타내도록 작성
  - type 이외에도 여러 키를 만들어 값을 전달할 수 있음

  - 예시

    ```jsx
    dispatch({
      type:'CHANGE_INPUT',
      name,
      value
    });
    
    //reducer 함수 내부
    case 'CHANGE_INPUT': //onChange
      return{
        ...state, 
        inputs: {
          ...state.inputs,
          [action.name]: action.value //action객체의 키값에 접근
        }
      };
    ```

    



