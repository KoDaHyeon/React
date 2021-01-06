import React from 'react';

function User({user}){ //{user}는 비구조화 할당. user=props.user
  return(
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}
//한 파일에 여러개의 컴포넌트를 선언할 수 있음

function UserList({users}){

  return(
    <div>
      {users.map((user) => 
        <User user={user} key={user.id} />
      )}
    </div>
  );
}

export default UserList;