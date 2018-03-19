# vue-cli+webpack搭建多页面应用程序  
> 什么是多页面

## 1⃣️、项目需求起源  

## 2⃣️、使用vue-cli创建项目  

## 3⃣️、项目结构的改造  
 
## 4⃣、修改webpack的生产环境和开发环境还有基础环境的配置    


- babel-polyfill插件
- webpack-dev-server： 是一个小型的Node.js Express服务器
- html-webpack-plugin： 生成html页面的插件
- opn：
- webpack-dev-middleware：生成一个与webpack的compiler绑定的中间件，然后再express启动的服务app中调用这个中间件，其主要作用：  
    1）、通过watch mode监听资源的变更，然后自动打包  
    2）、快速编译、走内存  
    3）、返回中间件，支持express的use格式