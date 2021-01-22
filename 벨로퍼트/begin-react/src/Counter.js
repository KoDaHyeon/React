import React, {useReducer} from 'react';

function reducer(state, action){ //현재 상태, action객체(주로 키로 type을 가짐)
  switch(action.type){
    case 'INCREMENT':
      return state + 1; //새로운 상태를 반환
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter(){
  const [number, dispatch] = useReducer(reducer, 0);
  //number:상태, dispatch:액션을 발생시키는 함수(상태를 변경하는 함수)
  //dispatch(액션객체) 형태로 사용
  //첫번째 파라미터:reducer함수, 두번째 파라미터:상태 초기값
  //dispatch 함수는 reducer를 거치면서 새로 가공한 state

  const onIncrease = () => {
    dispatch({type: 'INCREMENT'});
  };

  const onDecrease = () => {
    dispatch({type: 'DECREMENT'});
  };

  return(
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

/*
function Counter(){
  const [number, setNumber] = useState(0);
    //useState는 react 패키지에서 불러온 함수. 파라미터로 상태의 기본값을 넣음
    //배열 비구조화 할당
    //useState가 호출되면 배열이 반환됨. 배열의 0번째요소: 현재상태, 1번째요소:현재상태에 대한 Setter함수
    //0번째 요소는 number에, 1번째 요소는 setNumber에 할당

  const onIncrease = () => {
    //console.log('+1'); //브라우저에서 f12누르면 뜨는 Console탭에 기록됨
    //setNumber(number+1); //number+1이라는 새로운 값을 파라미터로 넣어줌
    //setNumber(number+1);
    setNumber(number => number+1);
    setNumber(number => number+1);
    console.dir(number);
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
    //on이벤트이름={실행할함수이름}
    //실행할함수이름'만 넣어줘야 함. 
    //onIncrease()이렇게 괄호까지 넣으면 렌더링되는 시점에 함수가 호출되버림.
}
*/

export default Counter;