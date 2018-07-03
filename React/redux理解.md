# React-redux 及 redux-orm的理解  
## 基础  
- **Action**  
`Action`是把数据从应用传到store的有效负荷，是store数据的唯一来源，其是通过`store.dispatch()`将action传到store。
`Action`是JS普通对象，其内不许使用一个字符串类型的type字段来表示将要执行的动作  

- **Action创建函数**  
`Action创建函数`就是生成action的方法  
在Redux中的action创建函数只是简单的返回一个action，使其更容易被移植和测试  

- **Reducer**  
`Reducers`指定了应用状态的变化如何相应actions并发送到store的  
reducer是一个纯函数接收旧的state和action，并返回新的state。   
只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。   


## 项目分析——部门功能模块  
- **`State`**  
添加department  
更新当前选择的部门：一般就是重命名更新  
更新当前部门下新创建的字部门  
删除部门  
获取和删除部门时的三种状态（请求、请求成功、请求失败）主要是为了实现异步请求  
- **`Action创建函数`**  
上面只有单独状态的，创建的函数就是简单的返回一个action   
请求接口的状态，需要跟其他状态相连，当获取完数据后，需要在ORM中的数据表里添加请求到的数据  

- **`Models`**   
在将actions发送到store之前，通过models可以对数据进行处理，一般就是提取数据，将数据与其他表相连  
- **`Reducer`**  
这部分代码主要是对每一个state和action的状态进行接收，并返回新的state  
如果是请求数据的状态，当数据请求成功之后需要连同关联的表也一起更新