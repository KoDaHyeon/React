import React, {useState, useRef} from 'react';

function InputSample(){
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  const nameInput = useRef();
  //useRef는 current 속성을 가진 객체를 반환함
  //파라미터로 넘어온 초기값을 current 속성에 할당함
  //current 속성의 값을 변경해도 컴포넌트가 리랜더링 되지 않음
  //컴포넌트가 리랜더링돼도 current 속성의 값이 날라가지 않음
  
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
    nameInput.current.focus(); //nameInput.current: 원하는 DOM을 가리킴, focus:DOM API(해당 DOM에 포커스함)
  };

  return(
    <div>
      <input 
      name="name" 
      placeholder="이름" 
      onChange={onChange} 
      value={name}
      ref={nameInput} />
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