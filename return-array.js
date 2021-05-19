function deepCheck(value1, value2, checkType = false){

    if(typeof value1 == 'object' && value1 != null && typeof value2 == 'object' && value2 != null){

        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value2);
        const values1 = Object.values(value1);
        const values2 = Object.values(value2);
        
        if( keys1.length !== keys2.length ) return [false, `${value1} and ${value2} : different lengths`];

        for( i in keys1 ){
            if(keys1[i] != keys2[i]) return [false, `${keys1[i]} and ${keys2[i]} : different property names`];
        }

        for( i in keys1 ){
            if(values1[i] !== values2[i]){
                let seperateCheck = deepCheck(values1[i], values2[i], checkType);
                if(seperateCheck[0] == false) return seperateCheck;
            }
        }

        return true;
    }
    else{
        let result = checkType ? value1 === value2 : value1 == value2;
        return result ? result : [false, `${value1} and ${value2} : different values or types`];
    }
}

//--- Test Objects ---//

let objectOne = {
    name : 'john',
    age : 100,
    looks : 'good',
    object: {a:1,b:[1,{value:2}]},
    array : [1,2,3],
}
let objectTwo = {
    name : 'john',
    age : 100,
    looks : 'good',
    object: {a:1,b:[1,{value:2}]},
    array : [1,'2',3]
}

// (value1, value2, true -> if you also want to type check)

console.log(deepCheck(objectOne,objectTwo,true));   // [false, ......]
console.log(deepCheck(objectOne,objectTwo));        // true

console.log(deepCheck(1,'1',true));                 // [false, 1 and 1 : different values or types]
console.log(deepCheck(1,'1'));                      // true