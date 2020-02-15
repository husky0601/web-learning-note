var utils = {}

/**
 * 兼容浏览器的鼠标事件
 */
utils.captureMouse = function (element) {
    let mouse = {
        x: 0,
        y: 0
    }

    element.addEventListener('mousemove', function (event) {
        var x, y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }

        x -= element.offsetLeft
        y -= element.offsetTop

        mouse.x = x;
        mouse.y = y
    }, false)

    return mouse
}


utils.captureTouch = (element) => {
    let touch = {
        x: 0,
        y: 0
    }

    element.addEventListener('touchstart', (event) => {
        touch.isPressed = false
    }, false)

    element.addEventListener('touchend', (event) => {
        touch.isPressed = false
        touch.x = null
        touch.y = null
    }, false)

    // 处理程序负责追踪第一个触摸点与元素的相对坐标
    element.addEventListener('touchmove', (event) => {
        let x, y, touch_event = event.touches[0]
        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY
        } else {
            x = touch_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = touch_event.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }

        x -= offsetLeft
        y -= offsetTop

        touch.x = x
        touch.y = y
    }, false)

    return touch
}