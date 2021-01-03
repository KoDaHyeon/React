import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {

  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true} />
      {/*Hello 컴포넌트에 name, color 값을 전달*/}
      <Hello color="pink" />
      {/*name값을 지정하지 않았으므로 defaultProps의 name값이 사용됨*/}
    </Wrapper>
  );
}

export default App;
