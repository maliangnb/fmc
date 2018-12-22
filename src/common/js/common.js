/*showPerText每行显示多少字数
* strText为文本内容(type:String)
* perLen为设备屏幕中每行文字的长度
* */
function showPerText(strText, perLen) {
    //数据初始化
    var num = 1//行数
    var strN = 0
    var strLen = 0 //文本内容字节总长度
    var arr = [] //截取文本数组
    for (var i = 0; i < strText.length; i++) {
        if (strText.charCodeAt(i) > 255) {
            strLen += 2
            if (strLen > perLen * num) {
                strLen++
                arr.push(strText.slice(strN, i))
                strN = i
                num++
            }
        } else {
            strLen++
            if (strLen > perLen * num) {
                arr.push(strText.slice(strN, i))
                strN = i
                num++
            }
        }
    }
    //strLen处于perLen*num~perLen*num中间时
    arr.push(strText.slice(strN, strText.length))
    return [arr, num]
}

//对象深拷贝
function deepClone(target, ...sources) {
    console.log(arguments[1])
    sources.forEach(source => {
        // console.log(Object.keys(source))
        var descriptors = Object.keys(source).reduce((descriptors, key) => {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
            return descriptors
        }, {})
        Object.getOwnPropertySymbols(source).forEach(sym => {
            var descriptor = Object.getOwnPropertyDescriptor(source, sym)
            if (descriptor.enumerable) {
                descriptors[sym] = descriptor
            }
        })
        Object.defineProperties(target, descriptors);
    })
    return target
}
