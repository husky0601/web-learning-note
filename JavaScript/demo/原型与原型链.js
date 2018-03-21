// 例1：通过原型继承创建一个新对象
// inherit()返回一个继承自原型对象p的属性的新对象
// 这里使用ECMAScript 5中的Object.create()函数（如果存在的话）
//如果不存在Object.create()，则退化使用其他方法
// function inherit(p) {
//     if (p == null) throw TypeError()  // p是一个对象，但不能是null
//     if (Object.create) return Object.create(p) // 如果Object.create()存在，直接使用它
//     var t = typeof p                            // 否则进一步检测
//     if (t !== 'Object' && t !== 'function') throw TypeError()
//     function f () {}                          // 定义一个空构造函数
//     f.prototype = p                           // 将其原型属性设置为p
//     return new f()                            // 使用f()创建p的继承对象
// }

// var o = {}
// o.x = 1
// var p = inherit(o)
// p.y = 2
// var q = inherit(p)
// q.z = 3
// var s = q.toString()
// var result = q.x + q.y + q.z
// console.log('result:' + result)
// function Person () {
// }
// var friend = new Person()
// Person.prototype = {
//     constructor: Person,
//     name: 'Husky',
//     age: 24,
//     job: "前端工程师",
//     sayName: function() {
//         console.log(this.name)
//     }
// }
// console.log(friend.sayName())

//原型链
function SuperType() {
    this.property = true 
}
SuperType.prototype.getSuperValue = function(){
    return this.property
}
function SubType () {
    this.subproperty = false
}
//继承了SubType
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function () {
    return this.subproperty
}
var instance = new SubType()
// console.log(instance.getSuperValue())


// function Person(name) {
//     this.name = name 
// }
// Person.prototype = {
//     address: "上海"
// }

//生成人对象实例
// var person1 = new Person('Tom')
// var person2 = new Person('Jack')

//修改共享的属性address
// Person.prototype.address = "北京"
// person1.address = "杭州"
// console.log(person1.address) // 北京
// console.log(person2.address) // 北京

function Person(name) {
    this.name = name 
    // this.address = "上海" // 设置一个实例对象的共有属性address
}
Person.prototype.address = "上海"

//生成人对象实例
var person1 = new Person('Tom')
var person2 = new Person('Jack')

console.log('person1:' + person1.job)
console.log('person2:' + person2.job)