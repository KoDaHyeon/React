## bind 함수

- 자바스크립트에서 객체 안에 메소드에서 this는 그 메소드가 포함된 object를 가리킴

  - ```js
    var obj = {  
        prop: 'Hello',
        sayHello: function() {
            console.log( this.prop ); //this는 obj
        }
    };
    obj.sayHello(); //"Hello"
    ```

- ```js
  var obj = {
      prop: 'Hello',
      sayHello: function(){
          console.log(this.prop);
      }
  };
  obj.sayHello(); //"Hello"
  var reference = obj.sayHello;
  reference(); //undefined 출력 
  //변수 reference에 담길 때 obj와의 관계가 상실되기 때문
  ```

  - binding

    ```js
    var obj = {
        prop: 'Hello',
        sayHello: function(){
            console.log(this.prop);
        }
    };
    obj.sayHello(); //"Hello"
    var reference = obj.sayHello.bind(obj); //obj를 binding
    reference(); //"Hello"
    ```

    

- 함수의 안에서 this가 '현재 컴포넌트 자신'을 가리키지 않고, 아무것도 가리키지 않을 때

  - undefined 에러 뜸
  - **이벤트**가 발생할 때 호출되는 함수 안에 있는 this는 항상 아무것도 가리키지 않음..

- bind함수를 통해 this가 '현재 컴포넌트 자신'을 가리키도록 할 수 있음

  - ```jsx
    <a href="/" onClick={function(e){
            this.setState({ //bind함수 덕분에 this가 현재 컴포넌트를 가리킴
                mode:'welcome'
            });
        }.bind(this)}>{this.state.subject.sub}</a> //이 this는 bind없이도 현재 컴포넌트 가리킴
    ```

  - ```jsx
    var obj = {name:'egoing'};
    function bindTest(){
        console.log(this.name);
    }
    bindTest(); //this는 undefined
    var bindTest2 = bindTest().bind(obj); //bindTest의 this가 obj인 새로운 함수가 복제됨
    bindTest2(); //콘솔에 egoing 출력
    ```

    

