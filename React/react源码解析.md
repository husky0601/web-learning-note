# React源码解析（一）  

### 提纲    
1、目录框架（即入口文件、执行文件、导出等）  
- React版本信息：'react-15-stable/src/isomorphic/React.js'   
- ReactComponent: 'react-15-stable/src/isomorphic/modern/class/ReactBaseClasses.js'  
2、大致梳理react的流程：组件的实现与挂载、组件的类型、生命周期、事务和队列、事件系统  
3、以逻辑梳理为主，代码梳理为辅  
4、参考  
[React](https://github.com/facebook/react)  
[React Community](https://reactjs.org/)   
[《React源码解析》系列完结](https://juejin.im/post/5a84682ef265da4e83266cc4)  

### 总结  
这次梳理的主要目的是要让自己深入了解React的机制，在React的源码中哪些思维在平常书写代码的时候是可以使用到的