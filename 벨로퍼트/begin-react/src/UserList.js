import React from 'react';

function User({user}){ //{user}는 비구조화 할당. user=props.user
  return(
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}
//한 파일에 여러개의 컴포넌트를 선언할 수 있음

function UserList(){
  const users = [
    {
      id:1,
      username: 'velepert',
      email: 'velopert@gamil.com'
    },
    {
      id:2,
      username: 'tester',
      email: 'tester@gmail.com'
    },
    {
      id:3,
      username: 'koda',
      email: 'koda@gmail.com'
    }
  ];

  return(
    <div>
    {/*
      <User user={users[0]} />
      <User user={users[1]} />
      <User user={users[2]} />
    */}
    {users.map(user => 
      <>
        <User user={user} key={user.id} />
        <User user={user} key={index} />
      </>
      
    )}
    </div>
    //리액트에서 배열을 렌더링할 땐 key라는 props를 설정해야 함
    //key 값은 각 원소들마다 가지고 있는 고유값으로 설정해야 함
    //예제의 경우 user.id를 key로 설정 가능
    //고유값이 없다면 map() 함수를 사용할 때 설정하는 콜백함수의 두번째 파라미터 index를 key로 설정 가능
    
  );
}

export default UserList;