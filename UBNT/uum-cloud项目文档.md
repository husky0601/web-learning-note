# UUM Cloud 项目文档

|    日期    |    内容    | 操作人 |
| :--------: | :--------: | :----: |
| 2018/06/05 | 文档初始化 | zhiyu  |
|            |            |        |

### 1. 项目概况

项目地址：https://github.com/ubiquiti/UUM-Cloud

项目接口文档：https://dev-uum.svc.ubnt.com/doc/#/

设备通信文档： https://ubiquiti.atlassian.net/wiki/spaces/UUM/pages/507904156/Mqtt+bridge

### 2. 项目结构
```
├── Dockerfile	// 项目的 dockerfile，主要给运维部署用
├── build	// 项目打包相关文件，使用  `create-react-app` 自动生成，可根据项目需求定制
├── dist	// 项目打包后生成的文件，部署时只部署这个文件夹即可
├── nginx	// nginx 配置文件相关
├── public	// 存放一些项目公共文件，例如 `url配置文件`，`网站图标` 等
└── src // 项目的主文件夹，所有的
    ├── api	// 封装了http请求(get, post, delete, update)，在请求发出前会对url或者参数做统一处理
    ├── assets	// 资源文件夹，存放图片，字体文件等
    ├── components // 公共组件库
    │   ├── column	// table组件的列定义
    │   ├── layout	// 带有布局功能的组件
    │   ├── modal	// 弹出框组件
    │   ├── panel	// 页面右侧弹出框
    │   └── table	// 一些公用table组件的封装，例如人员列表、日志列表等
    ├── firebase-messaging.js	// firebase
    ├── index.js	// 项目的入口文件
    ├── menus.js	// 左侧导航菜单的定义
    ├── proto // 和设备端通信使用 protobuf 协议
    │   ├── com.ubnt.uum.proto	// protobuf 数据定义
    │   ├── proto.json	// 使用 pbjs 命令生成的 proto.json
    │   └── protoMap.js	// 请求和相应的protobuf之间的映射关系
    ├── router	// react router 相关文件
    ├── sass 	// 公共sass文件	
    ├── store	// redux 及 redux-orm 相关文件
    ├── utils
    │   ├── connect.js	// 使用 mqtt 与设备端通过 protobuf 协议通信，封装了通信的细节，提供一些通信接口
    └── views	// 项目的功能模块
        ├── deploy 	// 部署、创建一个新的公司
        ├── entity 		// 公司的空间模块管理，包括楼、层、门以及挂载在这些空间上的设备管理，还有在空间及设备层面上的一些授权操作。
​        ├── login		// 登录模块
        ├── member	// 公司人员管理，也包括部门、角色管理和分配
```


### 3. 项目核心技术栈

UI ——  [React](https://reactjs.org/) 

UI design ——  [ant design](https://ant.design/) 

路由 —— [react-router](https://reacttraining.com/react-router/) 

状态管理 —— [redux / react-redux](https://redux.js.org/) 

redux 中间件 —— 

[redux-logger ](https://github.com/evgenyrodionov/redux-logger)

[redux-thunk](https://github.com/reduxjs/redux-thunk) 

关系型数据管理 —— 

[redux-orm](https://github.com/tommikaikkonen/redux-orm) 

设备端通信 —— 

[mqtt](https://github.com/mqttjs/MQTT.js) 

[protobuf](http://dcode.io/protobuf.js/) 

http —— [axios](https://github.com/axios/axios) 

### 4. 主要模块

#### 创建公司

按照事先设定的流程引导用户一步一步填写创新新公司所需要的数据。一些重要的数据比如管理员邮箱、用户名等都要抛给服务端做校验。

在填写完 company url 点击 create company 进入 import users 后，实际上公司已经创建成功。

import users 有通过 gsuite 和 exchange 两种方式，由于 guite 和 exchange 授权后的回调地址需要认证，所以必须使用 uum.com 的域名才能成功授权。

#### 人员管理

人员管理模块在`部门`和`角色`两个层面上对人员进行组织和管理，同时也包括了对公司下所有部门和角色的管理。支持向部门和角色批量添加或移除人员。支持将人员添加进或移除出多个部门和角色。

向部门或角色批量添加人员时(select from existing members), 只会显示没有在当前选择的部门或角色的成员列表。

##### 部门

可以创建任意多个子部门，部门的层级没有程序层面的限制。每一个部门下面都可以挂载人员。

人员可以只挂载在子部门而不挂载在父部门下，也可以只挂载在父部门而不挂在在子部门下。针对这个特殊需求人员的部门选择的 Antd tree 组件做了专门的定制化，详细代码参考 [这里](https://github.com/ubiquiti/UUM-Cloud/blob/master/src/components/modal/selectDepartment.js)。

##### 角色

和部门不同的是角色目前只支持 角色组 > 角色 两级，并且人员只能挂载在角色下面。

人员的角色选择的 Antd tree 使用默认的配置即可。

目前不支持对系统角色(System)进行任何操作。

#### 空间管理

空间管理是除了 楼 / 层 / 门 等的管理之外，以门为单位管理门禁设备 / 进入日志 / 权限分配等。

左侧空间索引支持 楼 > 层 两级，点击层后右侧会显示当前层下的所有门。

一个门上可以挂载多个设备。

门的进出权限授权是把对部门授权和对个人授权混合在一起的。在每个部门下面，都有一个 All 选项。设计这个选项的考虑是方便处理后续添加的新成员的权限。考虑这样一种情况：给 A 部门现有的所有人授权进入某个门的权限，那么后续新加入这个部门的成员要不要获得这个权限呢？为了解决这个问题增加了一个 All 选项，选中那么部门当前所有人员以及后续加入这个部门的人员都获得这个权限，没有选中那么新加入人员不会获得这个权限。

#### 基于发现的设备配置流程

设备发现的消息是通过 firebase push 到前端的，关于 firebase 的前端设置在[这里](https://github.com/ubiquiti/UUM-Cloud/blob/master/src/firebase-messaging.js)，主要是一些初始化的操作（获取token，设置监听等）。push 消息的种类有很多，发现设备的push消息只是其中的一种（目前也只支持这一种）。

发现设备后，对设备进行配置，这个过程是前端直接与设备端进行通信的。在弹出的 NEW DEVICE SETUP 中，填好必要参数后点击 ok 按钮，实际上是通过 mqtt 直接向设备发起请求来 adopt 这个设备，完整的流程如下图：

![UUM Cloud RPC](https://trello-attachments.s3.amazonaws.com/5a4f1359066fdf8b630a6168/5b1654bc98358193737ea723/445a64157a675ee318b3953034273147/%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6.png)

收到设备返回的成功消息后，设备配置就算完成了，然后跳转到对应的 楼>层>门 的页面来显示刚才配置的设备。

### 5. 缺失部分

1. 创建公里流程里有一步是填写邮箱验证码，这个步骤服务端还没有支持，需要后需完善。
2. 基于发现的设备配置，当设备配置完成后，服务端的设备配置状态没有更新，导致消息列表里已经配置过的设备还是显示可以 setup。
3. 消息列表在前端已经做了所有消息和需要进行操作的消息的区分，但是服务端还为支持。
4. 不支持部门删除，服务端还没有做部门删除后，该部门下的人员处理。
5. 门禁设备的 live preview

### 6. 一些需要注意的点

1. 涉及到对基本单位（人员、部门、角色、楼、层等）的增删改时，除了接口调用，需要注意同步更新 redux-orm 里的数据

### 7. FAQ

1. 为什么要用 redux-orm

   > UUM Cloud 中存在大量的关系型数据。比如成员属于哪些部门，角色下面有哪些成员，门的进出权限开放给哪几个角色等等。
   >
   > 当我们修改了其中一个数据，那么与这个数据相关的所有关系都需要更新。表现在页面上就是当修改了一个成员的个人信息，那么部门列表，角色列表，公司成员列表中的这个成员的信息都需要更新。如果不使用 redux-orm，那么只有两种方式完成这件事：1.刷新页面 、 重新请求所有相关接口；2.手动去跟踪所有的接口返回数据，并找到数据中所有的成员信息并修改他，最后更新页面上的显示。这两种方式要么用户体验不够好，要么实现起来太过繁琐。redux-orm 主要就是为了解决上述问题，redux-orm 在本地维护了数据之间的关系，你只需要关心数据本身，当数据发生变化时，redux-orm 会自动帮你更新。

2. callAPIMiddleware 做了什么事

   > callAPIMiddleware 是自己写的一个 redux 中间件。主要作用是拦截包含 http 请求的 action，并且完成发起请求、处理请求成功和请求失败、发起相关的 action 的操作。简化了在项目中多个地方发起相同 http 请求的操作。要被这个中间件处理，需要把 action 处理成特定格式。一个例子：
   >
   > ````javascript
   > export function requestAdmin(adminId) {
   >   return {
   >     types: [REQUEST_ADMIN, REQUEST_ADMIN_SUCCESS, REQUEST_ADMIN_FAILURE],
   >     isORM: true,
   >     ORMType: CREATE_ADMIN,
   >     callAPI: () => get('/account/info'),
   >     params: { adminId }
   >   };
   > }
   > ````

3. 人员为什么可以只挂在子部门下却不挂在父部门下，要同时挂在父部门和子部门需要手动同时选中这两个部门

   > 这个主要是出于要按照部门分配权限的考虑。假设这样一种情况：A 是父部门，A-1 是子部门。人员 a 是 A 部门的 leader， 人员 b 是 A-1部门的成员。这个时候对 A 部门授权，那么这时候 A-1部门的成员 b 要不要获得这个权限呢？答案是不获得权限，这个授权是只针的 A 部门的 ledaer a的授权，虽然成员 b 挂在 A 的子部门 A-1 下，但是并不获得这个权限。反过来，对 A-1 部门授权，直接挂在 A 部门下的人员也是没有这个权限的。这样的设计虽然稍微有些难以理解，但是在授权上非常的灵活。