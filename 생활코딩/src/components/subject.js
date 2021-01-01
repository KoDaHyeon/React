import React, {Component} from 'react';
//Component클래스를 사용하기 위해 react라이브러리에서 load
//필수적으로 항상 넣는다고 생각

class Subject extends Component { 
    render(){ 
        return ( 
            <header> 
                <h1>{this.props.title}</h1>
                {this.props.sub}
            </header>
        ); 
}
}

export default Subject;
////외부파일에서 TOC클래스를 가져다 사용할 수 있도록 허용