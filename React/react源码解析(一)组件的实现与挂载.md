# React 源码解析之组件的实现与挂载


> 组件的构建和挂载  
```
ReactDOM.render(<App />, document.getElementById('root'));
```

### 1、组件是什么

> Component 是一个类/函数？  
> 构建一个 Component 并 console.log

```
<B> <p>This is <strong>B</strong> component <p> </B>
```

![](./img/component1.png)  
组件 B 打印出来是一个对象，而组件中的 element 都被包含在了 childdren 属性中，存储为一个 DOM 节点树

### 2、构建一个组件

> 文件路径：

- `ReactBaseClasses:`(react-15-stable/src/isomorphic/modern/class/ReactBaseClasses.js)
- `ReactElement:`(react-15-stable/src/isomorphic/classic/element/ReactElement.js)
- `ReactMount:` (react-15-stable/src/renderers/dom/client/ReactMount.js)

> `The Life-Cycle of a Composite Component`(react-15-stable/src/renderers/shared/stack/reconciler/ReactCompositionComponent.js)

```
function ReactComponent(props, context, updater){
    this.props = props
    this.context = context
    this.refs = emptyObject
    this.updater = updater || ReactNoopUpdateQueue;
}
ReactComponent.prototype.isReactComponent = {}
ReactComponent.prototype.setState = function(partialState, callback){}
ReactComponent.prototype.forceUpdate = function(callback){}

module.exports = ReactComponent
```

在创建`ReactComponent`函数时，`ReactComponent`具有`props`、`context`、`refs`、`updater`等属性，以及`setState`、`forceUpdate`等方法  
在创建组件时，便可通过 class 类方法继承 ReactComponent 方法，并且使用其原型链上的方法

```
class A extends ReactComponent {
    render() {
        return {
            <div>Component A </div>
        }
    }
}  
```  
