let a = new Set([2, 5, 95, 12, 20, 35, 54, 10]) 
let b = new Set([3, 20, 50, 12, 35]) 

// 交集
function intersectionFun(array1, array2){
    array1 = new Set(array1)
    array2 =  new Set(array2)

    let intersection = new Set([...array1].filter(x => array2.has(x)))

    return Array.from(intersection)
}

// 并集
function unionFun(array1, array2){
    array1 = new Set(array1)
    array2 =  new Set(array2)

    let union = new Set([...array1, array2])
    
    return Array.from(union)
}

// 差集
function differenceFun(array1, array2){
    array1 = new Set(array1)
    array2 =  new Set(array2)

    let difference = new Set([...array1].filter(x => !b.has(x)))
    
    return Array.from(difference)
}

console.log(differenceFun(a, b))
