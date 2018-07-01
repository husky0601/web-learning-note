let tree = [
    {
        id: '1', child: [
            { id: '1-1' }, {
                id: '1-2', child: [
                    { id: '1-2-1' }, { id: '1-2-2' }
                ]
            }, { id: '1-3' }
        ]
    },
    { id: '2' },
    { id: '3', child: [{ id: '3-1', child: [{ id: '3-1-1', child: [{ id: '3-1-1-1' }] }] }, { id: '3-2' }, { id: '3-3' }, { id: '3-4' }] },
    { id: '4', child: [{ id: '4-1' }, { id: '4-2' }, { id: '4-3', child: [{ id: '4-3-1' }] }] }
]

// var fun1 = (id) => {
    
// }
// fun1(1)

var fun = (num) => {
    if(num === 1 || num === 2) {
        return 1
    }
    console.log(fun(num - 1) + fun(num - 2))
    return fun(num - 1) + fun(num - 2)
}
fun(6)
