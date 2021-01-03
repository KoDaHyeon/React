import React from 'react';

//Hello컴포넌트를 사용하는 외부에서 전달해준 props값을 '객체형태'로 받아옴
function Hello({color, name, isSpecial}){
  return (
    <div style={{color}}>
      {isSpecial? <b>*</b> : null}
      안녕하세요 {name}
    </div>
  );
  //props객체의 name값을 조회하려면 props.name으로 조회
  //style={{color: color}}도 똑같이 돌아감.. 근데 왜 그냥 {{color}}일까..?
  //Hello함수의 인자로 {color, name, isSpecial}을 준것 : 비구조화 할당
  //isSpecial이 true면 <b>*<b/> 를 렌더링.
  //isSpecial이 false면 null(=false, undefined)을 렌더링 ->화면에 아무것도 안보임
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
//Hello라는 컴포넌트를 export
//이렇게 해줘야 다른 컴포넌트에서 Hello 컴포넌트를 불러 사용할 수 있음
