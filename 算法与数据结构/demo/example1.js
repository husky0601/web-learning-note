const data = [
    {
        token: "435348fff14a4398",
        note: "",
        type: "user_bt",
        status: 1
    },
    // {
    //     token: "3147795336f5b22f35c2a79ccd1678e7",
    //     note: "",
    //     type: "user_face",
    //     status: 1
    // },

    // { token: "NFCTEST", note: "", type: "user_nfc", status: 3 }
]

function unique(array) {
    let object = {},
        newArray = []
    for (let i = 0; i < array.length; i++) {
        object[array[i].type] = array[i]
    }
    for (let value in object) {
        newArray.push(object[value])
    }
    return newArray
}

function handle(data) {
    const list = [
        { type: 'user_face', name: 'Face ID', icon: 'icon-faceid-small', token: 'Unregistered', status: 10 },
        { type: 'user_nfc', name: 'NFC Card', icon: 'icon-nfc-small', token: 'Unregistered', status: 10 },
    ]
    const identificationType = {
        user_face: ['Face ID', 'icon-faceid-small'],
        user_nfc: ['NFC Card', 'icon-nfc-small']
    }
    let obj = {}
    let array = []
    data = unique(data).filter((val) => { return val.type != 'user_bt' })
    if(!data.length) return list
    for (let i = 0; i < list.length; i++) {
        let listObj = list[i]
        for (let j = 0; j < data.length; j++) {
            let dataObj = data[j]
            if (dataObj.type == listObj.type) {
                obj = Object.assign(listObj, dataObj)
                array.push(obj)
            } else {
                array.push(listObj)
            }
        }
    }
    return array
}

console.log('handle(data)',handle(data))
