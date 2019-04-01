function getType(obj) {
    const str = Object.prototype.toString.call(obj);
    const map = {
        //object后面的数据类型是经过包装的，一定要写对
        "[object String]": "string",
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
    }
    return map[str];
}


function deepCloneObj(ele) {
    let obj;
    let type = getType(ele);
    if (type === "object") {
        obj = {};
        for (let key in ele) {
            obj[key] = deepCloneObj(ele[key]);
        }
    } else if (type === "array") {
        obj = [];
        for (let i = 0; i < ele.length; i++) {
            obj.push(deepCloneObj(ele[i]));
        }
    } else {
        return ele;
    }
    return obj;
}

// var a = {
// 	color: ['red', 'blue', 'black'],
// 	age: 10,
// }
// var b = deepCloneObj(a);
// b.color.push('green');
// console.log(a);
// console.log(b);
// console.log(typeof "1");
// console.log(typeof 1);
// console.log(typeof true);
// console.log(typeof null);
// console.log(typeof undefined);
// console.log(typeof []);
// console.log(typeof function () { });



// console.log("1"
//     instanceof String);
// console.log(1 instanceof Number);
// console.log(true instanceof Boolean);
// console.log([] instanceof Array);
// console.log({}
//     instanceof Object);
// console.log(function() {}
//     instanceof Function);

// console.log(new String("1") instanceof String);

// console.log("1", Object.prototype.toString(new String("1")));


console.log((2).constructor === Number);
console.log(("1").constructor === String);
console.log((true).constructor === Boolean);
// console.log((null).constructor === Null);
// console.log((undefined).constructor === undefined);
console.log(([]).constructor === Array);
console.log(({}).constructor === Object);
console.log((function() {}).constructor === Array);