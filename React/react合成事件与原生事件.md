# React合成事件与原生事件  
- react事件回调函数中event上的阻止冒泡作用  
`event.stopPropagation：` 在react事件回调函数中调用能阻止react合成事件的冒泡  
`event.nativeEvent.stopPropagation：` 基本没啥实际作用，阻止的是代理到根元素（如document）的事件。  
`event.nativeEvent.stopImmediatePropagation： `  阻止调用相同事件的其他侦听器，除了该事件的冒泡行为被阻止之外(event.stopPropagation方法的作用),该元素绑定的后序相同类型事件的监听函数的执行也将被阻止.所以可以阻止和react一样代理在document上的事件，如jquery中的 $(document).on('click', function(){});