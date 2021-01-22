import React, {useRef, useReducer, useMemo, useCallback} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length; //user.active가 true인 원소만으로 만든 새 배열의 길이
}

const initialState = { //초기 상태들
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

function reducer(state, action){
  switch(action.type){
    case 'CHANGE_INPUT': //onChange
      return{
        ...state, 
        //reducer를 통해 새로운 상태를 만들때에도 불변성을 지켜야하기 때문에 객체 직접 수정하지않고 spread로 복사후 수정
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
    case 'TOGGLE_USER':
      return{
        ...state,
        users: state.users.map(user =>
          user.id === action.id? {...user, active:!user.active} : user
        )
      };
    case 'REMOVE_USER':
      return{
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const {users} = state;
  const {username, email} = state.inputs;

  const onChange = useCallback(e => {
    const{name, value} = e.target;
    dispatch({
      type:'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type:'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id =>{
    dispatch({
      type: 'TOGGLE_USER',
      id //id: id
    });
  }, []);

  const onRemove = useCallback(id =>{
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser 
        username={username} 
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

/*
function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const {username, email} = inputs;

  const onChange = useCallback(
    e =>{
      const {name, value} = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    [inputs]
  );

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

  const onCreate = useCallback(
    () => {
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
      setUsers(users => users.concat(user)); //함수형 업데이트(최적화를 위함)
      setInputs({
        username: '',
        email: ''
      });
      nextId.current += 1;
    },
    [username, email]
  );

  const onRemove = useCallback(
      id => {
      setUsers(users => users.filter(user => user.id !== id));
      //users 배열에서 각 원소를 파라미터 user로 받을 때, user.id !== id가 true인 원소만 추출해서 새 배열 만듦
      },
      []
  );

  const onToggle = useCallback(
    id => {
      setUsers(users =>
        users.map(user =>
          user.id === id ? {...user, active: !user.active} : user)
      );
      //users 배열(상태) 원소 하나하나 조회(user로 받음)해서 user.id === id가 true면,
      //user객체 내용을 복사하고 active 키와 값을 추가한 새로운 객체를 반환
      //false면 user 그대로 반환
      //이 객체들로 새로운 배열을 만듦
      //그걸 users 상태로 바꿔치기
    },
    []
  );

  //const count = countActiveUsers(users); 
  //count는 활성 사용자 수
  //컴포넌트가 리렌더링될 때마다 호출됨
  //상태가 변할 때마다 컴포넌트는 리렌더링됨
  //-> input태그 안에 입력내용이 바뀌면 onChange가 변화를 감지해 onChange함수가 실행되고
  //따라서 inputs(상태)값이 바뀌어 리렌더링되고 countActiveUsers함수가 불필요하게 호출됨!!
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

*/
export default App;
