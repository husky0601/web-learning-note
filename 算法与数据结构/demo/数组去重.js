// 数组中去除含有相同键值的对象  
let data = [
    {
        "token": "1",
        "note": "",
        "type": "user_bt",
    },
    {
        "token": "2",
        "note": "",
        "type": "user_face",
    },
    {
        "token": "3",
        "note": "",
        "type": "user_face",
    }
]

function unique(array) {
    let obj = {}, 
        newArray = []
    for(let i = 0; i < array.length; i++){
        obj[array[i].type] = array[i]
    }
    console.log(obj)
    for(value in obj) {
        newArray.push(obj[value])
    }
    return newArray
}

console.log(unique(data)) 