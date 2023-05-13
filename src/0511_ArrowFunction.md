## 일반적인 Function 과 Arrow Function 차이

Arrow function은 자바스크립트 표준 규격인 ES의 6 버전에서 추가된 function 선언 방법이다.
일반적인 function은 메서드, 생성자 함수, 중첩 함수 등을 선언할 때 사용하지만, Arrow function은 콜백 함수, 배열의 메서드 함수(map, filter, reduce ...) 등을 선언할 때 사용한다.

1. 문법

```javascript
// 일반적인 function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};
```

Arrow function은 매개변수가 1개일 경우 괄호 생략 가능하다.

<br>
<hr>
<br>

2. `this`

일반적인 function의 경우 `this` 키워드는 해당 함수를 호출한 객체를 참조하게 되는 반면,
Arrow function에서 `this` 키워드는 함수를 정의할 때의 context를 정적으로 가리키게 된다.

```javascript
const object = {
  name: "my name",

  // 일반적인 function
  sayName: function () {
    console.log(this.name);
  },

  // Arrow function
  sayNameArrow: () => {
    console.log(this.name);
  },
};

object.sayName(); // 'my name'
object.sayNameArrow(); // undefined
```

위의 코드에서 일반적인 function은 `this` 키워드가 object 객체를 참조하기 때문에 name 값을 가져올 수 있지만, Arrow function은 `this` 키워드가 전역 객체를 참조하기 때문에 undefined 결과 값을 나타낸다.

<br>
<hr>
<br>

3. `return` 값

Arrow function은 함수 내부에서 값을 반환할 때, 중괄호와 `return` 키워드 없이 바로 반환할 값을 작성할 수 있다.

```javascript
// 일반적인 function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
```

<br>
<hr>
<br>

4. `arguments`

일반적인 function에서는 `arguments` 객체를 통해 매개변수를 배열 형태로 받을 수 있지만,
Arrow function에서는 `arguments` 객체를 사용할 수 없다.
그 대신 `rest parameter`를 사용하여 매개변수를 배열 형태로 받을 수 있다.
여기서 `rest parameter`란 ES6에서 새로 추가된 파라미터로, `...`을 붙여서 뒤에 남는 요소들을 배열로 받는 역할을 한다.

```javascript
// 일반적인 function
function sum() {
  let total = 0;
  for (let i = 0; i < argumnts.length; i++) {
    total += arguments[i];
  }
  return total;
}

// Arrow function
const sum = (...args) => {
  let total = 0;
  for (let i = 0; i < args.length; i++) {
    total += args[i];
  }
  return total;
};
```
