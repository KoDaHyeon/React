import React, {useEffect} from 'react';

function User({user, onRemove, onToggle}){ //{user}는 비구조화 할당. user=props.user
  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  return(
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
  //이벤트핸들러에 붙인 함수에 파라미터를 전달하려면 화살표 함수로 해야함
  //() => onRemove(user.id)인 이유(내 추측ㅎㅎ;암기를 위해 작성)
  //onClick={onRemove(user.id)}라고 하면 렌더링시 바로 호출되버림
  //() => onRemove(user.id)라고 하면 버튼이 클릭됐을 때 {}속 함수가 호출되기때문에 onRemove함수가 호출됨
  //&nbsp; : 공백1칸. 여러개 입력하면 그만큼의 공백이 생김.
  //cursor: 'pointer' : 해당 태그에 마우스를 올리면 커서가 손가락 모양으로 변함
 }
//한 파일에 여러개의 컴포넌트를 선언할 수 있음

function UserList({users, onRemove, onToggle}){

  return(
    <div>
      {users.map((user) => 
        <User 
          user={user} 
          key={user.id} 
          onRemove={onRemove}
          onToggle={onToggle}
        />
      )}
    </div>
  );
}

export default UserList;