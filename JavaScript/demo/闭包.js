// 作用域
var scope = "global scope"; //全局变量
function checkscope() {
  var scope = "local scope"; //局部变量
  function displayScope() {
    return console.log("scope: " + scope); //在作用域中返回这个值
  }
  return displayScope();
}
// checkscope()               // => 'scope: local scope'

//闭包
function mackFn() {
  var name = "Husky";
  function sayName() {
    console.log("name:" + name);
  }
  return sayName;
}
var myFn = mackFn();
// myFn()

function Fn(count) {
  (function() {
    for (var i = 0; i < count; i++) {
      console.log(i);
    }
  })();
  console.log("i:" + i);
}
// Fn(5)
function Num(count) {
  for (var j = 0; j < count; j++) {
    console.log(j);
  }
  console.log("j:" + j);
}
// Num(3)

// 闭包循环陷阱
// function createFn() {
//   for (var n = 0; n < 10; n++) {
//     console.log(n)
//     setTimeout(function() {
//       console.log(n);
//     }, 100 * n);

//   }
// }

function createFn() {
  for (var k = 0; k < 10; k++) {
    (function(num) {
      setTimeout(function() {
        return console.log(num);
      }, 100 * k);
    })(k);
  }
}
createFn();
