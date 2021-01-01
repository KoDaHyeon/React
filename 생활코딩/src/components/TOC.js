import React, {Component} from 'react';

class TOC extends Component{
    //TOC는 this.props.data를 받은 상태

    render(){
      var lists=[]; //ul태그로 묶을 li태그들을 넣을 배열
      var data=this.props.data;
      var i=0; //반복문을 props의 data길이(배열요소의 개수)만큼 반복
      while(i<data.length){
        lists.push(<li key={data[i].id}><a href={"/content/"+data[i].id}>{data[i].title}</a></li>); 
        //lists.push : li태그가 하나씩 생성돼서 list에 담김
        //App의 state값을 수정해도 TOC.js의 로직을 수정하지 않아도 됨
        //key={data[i].id} : 여러개의 목록을 자동생성할때 key라는 props가 없으면 오류가 뜸
        //key값은 각 목록을 구별할 수 있도록 하는 것. 내가 사용할 값은 아니고 react가 내부적으로 필요해서 요청하는 값 
        i=i+1;
      }
      return(
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }

  export default TOC; 