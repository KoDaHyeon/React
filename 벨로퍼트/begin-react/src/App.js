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
      email, //email:email과 결과는 같음
    };
    //setUsers([...users, user]); //배열을 직접 수정하면 안됨. 
    //spread문법을 통해 기존 users배열을 펼쳐서 복사해온뒤, user객체를 추가해서 새로운 배열을 생성
    //그 새로운 배열로 users를 설정
    setUsers(users.concat(user)); //users에 user객체를 추가한 새로운 배열로 users를 설정
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
    //users 배열에서 각 원소를 파라미터 user로 받을 때, user.id !== id가 true인 원소만 추출해서 새 배열 만듦
  };

  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? {...user, active: !user.active} : user)
    );
    //users 배열(상태) 원소 하나하나 조회(user로 받음)해서 user.id === id가 true면,
    //user객체 내용을 복사하고 active 키와 값을 추가한 새로운 객체를 반환
    //false면 user 그대로 반환
    //이 객체들로 새로운 배열을 만듦
    //그걸 users 상태로 바꿔치기
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
       />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>
  );
}

export default App;
