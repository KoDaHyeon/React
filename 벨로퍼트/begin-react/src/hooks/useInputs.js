import {useState, useCallback} from 'react';

function useInputs(initialForm){
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setForm(form => ({...form, [name]: value}));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

//const [form, onChange, reset] = useInputs(초기값); 이 형태로 사용할 듯
//form은 input상태
//onChange는 input태그에서 받아온대로 input상태의 값을 변경하는 함수
//reset는 input상태의 값을 초기값(initialForm)으로 재셋팅하는 함수 
export default useInputs;