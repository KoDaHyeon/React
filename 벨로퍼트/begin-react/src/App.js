import React, {useRef, useState} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const {username, email} = inputs;

  const onChange = e =>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4); //Ref.current 초기값이 4인 Ref객체 반환
  //nextId.current값이 변경돼도 리렌더링x. 리렌더링 필요없이 값 업데이트됨

  const onCreate = () => {
    //users(배열)에 넣을 새 객체 생성
    //username: username(inputs.username)이어야 하는데 그냥 username임. 왜??
    //비슷한예) color:color(props.color)인데 그냥 color라고 씀
    const user = {
      id: nextId.current,
      username, //username:username과 결과는 같음
      email //email:email과 결과는 같음
    };
    setUsers([...users, user]); //배열을 직접 수정하면 안됨. 
    //spread문법을 통해 기존 users배열을 펼쳐서 복사해온뒤, user객체를 추가해서 새로운 배열을 생성
    //그 새로운 배열로 users를 설정
    setUsers(users.concat(user)); //users에 user객체를 추가한 새로운 배열로 users를 설정
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
       />
      <UserList users={users}/>
    </>
  );
}

export default App;
