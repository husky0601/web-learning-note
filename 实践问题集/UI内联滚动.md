# 内联滚动条的UI实现以及触发滚动条事件的时机  
## 基本概念：  
1、`scrollHeight：`是一个只读的元素内容高度的属性，包括由于溢出导致的视图中不可见内容。在没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值clientHeight相同（包括padding，但不包含border、margin。其也有::before、::after伪元素。  
  
  判断元素是否滚动到底部：   
 `el.scrollHeight - el.scrollTop == el.clientHeight`    
   
  2、`scrollTop`: 获取或设置一个元素的内容垂直滚动的像素值。一个元素的scrollTop值是这个元素的顶部到它的最顶部可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的scrollTop值为0   
    
  3、`calc()`:这是CSS的一个函数，主要通过计算来决定一个CSS属性的值。  
  表达式：  `calc( <calc +-*/ value> )`  
  > 注意事项：  
  >   `+` 和 `- `运算符的两边必须始终要有空白符， `*` 与 `/` 的value必须是一个number类型。  
  >   `calc()`里面可以嵌套多个`calc()`函数   

  应用场景：  
  - 使用指定的外边距定位一个对象  
  - 自动调整表单域的大小以适应其容器的大小  
  - 使用CSS变量来嵌套calc()  

  兼容性：  
  对于Chrome、Safari、Firefox可兼容，但是需要有前缀，IE只能兼容到9以上的浏览器，不支持安卓端的IE和Android浏览器