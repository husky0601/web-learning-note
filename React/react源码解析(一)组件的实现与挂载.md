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
class View extends React.Component{
    render () {
        return(
            <div className="wrapper--outer">
            <App />
            <div className="wrapper1--inner" style={{ color: "#38f" }}>
              hello world
            </div>
            <div className="wrapper2--inner">hello world</div>
          </div>
        )
    }
}
ReactDOM.render(<View />, document.getElementById("root"));
```  
当创建了组件A后，继承了ReactComponent方法，如果要将组件A渲染到DOM上，需通过render()方法进行渲染。 

```
var View = function (_React$Component) {
    _inherits(View, _React$Component);

    function View() {
        _classCallCheck(this, View);

        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
    }

    _createClass(View, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "wrapper--outer", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 27
                    },
                    __self: this
                },
                React.createElement(__WEBPACK_IMPORTED_MODULE_0__App__["a" /* default */], {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 28
                    },
                    __self: this
                }),
                React.createElement(
                    "div",
                    { className: "wrapper1--inner", style: { color: "#38f" }, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 29
                        },
                        __self: this
                    },
                    "hello world"
                ),
                React.createElement(
                    "div",
                    { className: "wrapper2--inner", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 32
                        },
                        __self: this
                    },
                    "hello world"
                )
            );
        }
    }]);

    return View;
}(React.Component);

ReactDOM.render(React.createElement(View, {
    __source: {
        fileName: _jsxFileName,
        lineNumber: 38
    },
    __self: this
}), document.getElementById("root"));

```
