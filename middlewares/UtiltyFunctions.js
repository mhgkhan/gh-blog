import jwt from 'jsonwebtoken'

export const errorSender = (err) => {
    throw new Error(err)
}

export const checkReqBodyValidOrNot = (arr) => {
    // console.log(arr)
    let errors = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "" || arr[i] == undefined || !arr[i] || arr[i].length < 2) {
            errors.push(false)
        }
        else {
            errors.push(true)
        }
    }

    // if arr length is 3  so this is for signup else skip it 
    if (arr.length == 3) {
        if (arr[1] !== arr[2]) {
            errors[1] = false
            errors[2] = false
            return errors
        }
        else {
            return errors
        }
    }
    return errors
}



export const genToken = (obj) => jwt.sign(obj, process.env.SECRET_KEY_LOCAL);
export const processToken = (token) => jwt.verify(token, process.env.SECRET_KEY_LOCAL);


