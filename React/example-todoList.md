# Redux-ORM理解之实现Todo List

### 一、概念  
- **`redux-orm`及其作用:**    
redux-orm主要是用来管理我们的state数据，当一个项目比较大，逻辑结构比较复杂，每个数据之间都有联系，此时便需要将这些state进行统一管理，redux-orm就是用来解决这些数据间的关联问题，所以redux-orm就像一个关系型数据库，而每个对象类型就像是数据库中的数据表，并且是以JavaScript的对象形式存储这些数据的。  
那么也就是说，当项目的中涉及到的对象类型并不很多，且对象类型之间的关联性不大的时候，并不建议使用redux-orm，如果项目足够简单，连redux也不需要使用到。  

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
在ORM中定义了一个Model类来将实体类关联起来， 对于Todo这个实体类来说，通过ES6类语法进行定义，并继承了ORM的Model类。   
Model需要设置名称才可以识别到对应的数据，以及实体类与其他数据关联的方式。  
对于Todo类来说，它跟User只能是一对多，一个User下有多个Todo，而跟tag可以多对多，一个Todo可以有多个tag，通用一个tag可以存在在多个Todo中，所以Model类中的`fields`主要是用了来定义当前实体类与其他类的关联关系，这些如：`fk`、`many`、`oneToOne`接收两个参数，第一个是被关联的实体类，就是在Model中定义的`modelName`和操作的类名。 而且关联关系只需要定义一次就可以了，不需要重复定义。  
最后要实现实体类间的关联必须将其注册到`Schema()`方法中并导出，这样才能够真正关联其实体间的关系。当实体类比较多的情况下，可能需要一个单独的文件来存放这些需要注册的实体类，这样可以使项目模块化更易于管理。
```
import { Schema, Model, many, fk } from 'redux-orm';
import {
    CREATE_TODO,
    MARK_DONE,
    DELETE_TODO,
    ADD_TAG_TO_TODO,
    REMOVE_TAG_FROM_TODO,
} from './actions';   

export class Todo extends Model {
    static reducer(state, action, Todo, session) {
        const { payload, type } = action;
        switch (type) {
        case CREATE_TODO:
            const tagIds = action.payload.tags.split(',').map(str => str.trim());
            const props = Object.assign({}, payload, { tags: tagIds, done: false });
            Todo.create(props);
            break;
        case MARK_DONE:
            Todo.withId(payload).done = true;
            break;
        case DELETE_TODO:
            Todo.withId(payload).delete();
            break;
        case ADD_TAG_TO_TODO:
            Todo.withId(payload.todo).tags.add(payload.tag);
            break;
        case REMOVE_TAG_FROM_TODO:
            Todo.withId(payload.todo).tags.remove(payload.tag);
            break;
        }
    }
}
Todo.modelName = 'Todo';
Todo.fields = {
    tags: many('Tag', 'todos'),
    user: fk('User', 'todos'),
};

export const schema = new Schema();
schema.register(Todo);

export default schema;
```
##### 5、更新状态  
`Reducers`主要是用来更新state，响应actions并发送到store的引用状态变化。  
在Redux应用中，所有的state都被保存在一个单一对象中。  
`reducer`是一个纯函数，接收旧的state和action，返回新的state。不能够在reducer中传递参数、执行有副作用的操作以及调用非纯函数。只需单纯地执行计算就可以，其更新是局部的，只有当当前的reducer中的数据发生改变后，reducer才会重新进行计算。  
在Redux-ORM中使用特定reducers的模型来操作数据。首先在Model类中先定义一个静态的reducer方法，它会接收所有需要更新的action。如果没有定义reducers的话，ORM会直接使用默认方法去实现更新。  
其原理是，在静态的reducer方法中接收四个参数：state（状态）、action（当前操作)、Todo(模型类)、session（ORM的会话实例）。在Todo的reducer中，通过对当前Todo的type进行循环遍历来执行对Todo的增加、删除、修改等操作，而session这个会话实例参数主要是用来访问和查询其他Model，但是不建议在当前的Model修改其他Model中的数据。  

##### 6、数据的筛选    
在Redux-ORM中的seletors是使用了了第三方插件[reselect](https://github.com/reduxjs/reselect)  
selector在ORM中可以计算派生数据，其在整个ORM中一直是有效的，跟reducer一样，只要其接收的参数发生改变就会触发该方法，而且selector是可组合的，可以作为其他seletor的输入
```
export const todos = createSelector(
    ormSelector,
    state => state.selectedUserId,
    schema.createSelector((orm, userId) => {
        return orm.Todo.withRefs.filter({ user: userId }).map(todo => {
            const obj = Object.assign({}, todo.ref);
            obj.tags = todo.tags.withRefs.map(tag => tag.name);
            return obj;
        });
    })
);  
```
首先使用createSelector方法创建了todo的选择器，该方法中的第一个参数始终是orm的selector，然后对input selector进行回调，回调是用过schema创建了createSelector方法来计算关联的数据然后并返回。   
在todo的seletor中，通过与selectedUserId中进行关联，当被选中的userId发生变化时就会触发该方法，并过滤出该user下的所有Todo数据及该Todo下的tag数据并返回。

##### 7、应用在视图中   
当我们将所有的数据都定义好了之后，就需要在视图中去使用  
首先,在入口文件导入redux中的createStore、combineReducers、applyMiddleware、Provider还有redux中的createLogger等方法  
`createStore：`该函数主要是用来生成store, store就是保存数据的地方，相当于一个容器，整个项目中只能有一个store  
`combineReducer:`主要是用于Reducer的拆分，其可以将拆分的各个子reducer函数通过该方法合成一个大的Reducer  
`applyMiddleware`、`createLogger`都是redux的中间件，主要是用来执行异步操作。其中`createLogger`是[redux-logger](https://github.com/evgenyrodionov/redux-logger)模块中的方法，是生成redux日志，并打印在控制台，该方法是放在`applyMiddleware`方法中。
`Provider:`  主要是让Store容器组件拿到state。
最后，可以使用redux中的connect()方法将UI组件和store容器组件连接起来，主要依靠输入与输出来实现。  
输入（`mapStateToProps`）是将store中的数组转化为UI组件的参数。 其是一个函数，建立一个从state对象到UI组件props对象的映射关系，其执行后返回一个对象，里面的每个键值对就是一个映射
输出（`mapDispatchToProps`）是用户发出的动作转变成Action对象，从UI组件传出去。它定义哪些用户的操作应该当做Action并传给Store，它个可以是一个函数，也可以是一个对象。