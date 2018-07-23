# Redux-ORM之实现Todo List
> 这个例子中主要使用的是orm技术  
### 一、概念  
- **`redux-orm`及其作用:**    
redux-orm主要是用来管理我们的state数据，当一个项目比较大，逻辑结构比较复杂，每个数据之间都有联系，此时便需要将这些state进行统一管理，redux-orm就是用来解决这些数据间的关联问题，所以redux-orm就像一个关系型数据库，而每个对象类型就像是数据库中的数据表，并且是以JavaScript的对象形式存储这些数据的。  
那么也就是说，当项目的中涉及到的对象类型并不很多，且对象类型之间的关联性不大的时候，并不建议使用redux-orm，如果项目足够简单，连redux也不需要使用到。  
- **工作原理：**  
以餐厅为例，餐厅需要一个实体列表的reducer。为了存储餐厅的信息，需要有一个item的数组来存储餐厅所有的id，和通过map返回出的id（itemById）的数组，在餐厅的reducer中，为了将item与itemById分开管理，在itemById创建了另一个subreducer来更新各个餐厅属性。

### 二、实现Todo List及代码解析  
##### 1、分析实例及行为  
在todo list 实现的基本功能有：  
选择用户  
创建todo    
标记todo完成  
删除todo
创建tag标签  
移除tag标签  
所以按照上面的功能，可以将todo list分为三张表，分别是user（用户表）、todo表和tag标签表，这些表就相当于一个实例，每个实例都会有自己的行为属性和方法  
- **`User:`**  
属性：id、 name      
行为：selectUser    
- **`Todo:`**  
属性：id、text（todo内容）、done（标记结束）、user、 tags  
行为： createTodo、markDone、deleteTodo  
- **`Tag:`**  
属性： name  
行为： addTagToTodo、 removeTagFromTodo

##### 2、创建state  
`State`是一个对象，是用来描述应用。在这个todo list中，当需要有一个对象用来描述
##### 3、Action创建函数   
`Action`是把数据从应用传到store的有效载荷，它是store数据的唯一来源。其本质上是JavaScript普通对象，action内必须使用type字符串类型，type表示将要执行的动作，在多数情况下，type被已定义为字符串常量。  
`Action创建函数`就是生成action方法，该方法只是简单的返回一个action。例如，对于添加标签这个action是这样执行的，先创建一个addTagToTodo的方法，该方法接收tag和todo两个参数，然后将其返回为一个对象，其中对象的属性值中必须有一个type  
```
export const addTagToTodo = (todo, tag) => {
    return {
        type: ADD_TAG_TO_TODO,
        payload: {
            todo,
            tag,
        },
    };
};
```
##### 4、构建数据表并关联
##### 5、更新状态
##### 6、数据的筛选
##### 7、应用在视图中