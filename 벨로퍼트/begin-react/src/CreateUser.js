import React from 'react';

const CreateUser = ({username, email, onChange, onCreate}) => {
  return(
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default React.memo(CreateUser);
//React.memo : 컴포넌트의 props가 바뀌었을 때만 컴포넌트를 리렌더링하도록 설정
//이거 안하면 props가 그대로인데 쓸데없이 컴포넌트를 리렌더링함
//React.memo(불필요한 렌더링 방지하고 싶은 컴포넌트)