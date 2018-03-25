// 解析查询字符串
function getQueryStringArgs() {
    // 取得查询字符串并去掉开头的问号
    let qs = (location.search.length > 0) ? location.search.substring(1) : "",
        args = {}, // 保存数据对象
        items = qs.length ? qs.split("&") : [], // 取得每一项
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length
    for(i = 0; i < len.len; i++) {
        item = items[i].split("=")
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])
        if(name.length){
            args[name] = value
        }
    }
    return args
}