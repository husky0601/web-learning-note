# 理解React事务与更新队列     

> **什么是事务，什么是队列**   
1、事务：  
    在计算机中事务的概念主要来源于数据库，是数据库管理系统执行过程中的一个逻辑单位，由一个有限的数据库操作序列构成。  
    数据库事务通常包含了一个序列的对数据库的读/写操作。  
    其具有原子性、一致性、隔离性和持久性  
2、队列  
    是先进先出（FIFO）的线性表，通常用链表或者数组来实现。   
    队列只允许在后段进行插入操作，在前端进行删除操作  
    队列一般的形式有单链队列、循环队列以及阵列队列   


在自定义组件中，当我们要更新一个or多个state中的值时，我们会通过this.setState进行调用，而更新的过程中会需要了解事务机制和更新队列

**1、`this.setState`**    

在React组件中定义的setState方法，该方法传入了两个参数`partialState`为新的state值和`callback`回调函数

```
ReactComponent.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};
```
在该方法中，调用了的`update`则是在React的构造函数中定义的。在自定义组件的挂在函数中通过`getUpdateQueue()`方法获取到需要的`updateQueue`最后通过`_constructComponentWithoutOwnerfunction`方法调用构造函数并且传出`updateQueue`,而`updateQueue`就是对应构造函数的参数`update`
```
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

_constructComponentWithoutOwnerfunction(doConstruct,publicProps,publicContext,updateQueue) {
    var Component = this._currentElement.type;
    return new Component(publicProps, publicContext, updateQueue);
}
```


- `enqueueSetState`  
`enqueueSetState`在文档中的介绍的意思是：这是一个设置`state`的子集，只因为`_pendingState`是内部状态而存在。在这个函数中提供了一种合并策略，但是这种合并策略部适用于深层属性。  
在这个函数中接收两个参数：  
`publicInstance`：需要被重新渲染的实例即当前组件   
`partialState`:要与state合并的下一个部分state    
`getInternalInstanceReadyForUpdate`方法是获取当前组件对象并将其赋值给`internalInstance`变量。如果当前`internalInstance`存在需要更新的state队列，则将`partialState`加入当前队列，如果不存在，则创建该对象的更新队列，然后调用`enqueueUpdate`
```
enqueueSetState: function(publicInstance, partialState) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance,'setState');

    if (!internalInstance)return;

    var queue =internalInstance._pendingStateQueue ||(internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    enqueueUpdate(internalInstance);
},
```

- `enqueueUpdate`
```
function enqueueUpdate(component) {
  ensureInjected();

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
}
```  

- `ReactDefaultBatchingStrategy`
> react-15.6-dev/src/renderers/shared/stack/reconciler/ReactDefaultBatchingStrategy.js  

```
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      return transaction.perform(callback, null, a, b, c, d, e);
    }
  },
};
```

**2、`transaction`事务处理**

