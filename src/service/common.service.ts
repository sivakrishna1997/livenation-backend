const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);


const newToken = async (payload: any) => {
    let token = await jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: 36000
    })
    console.log("token", token);
    return 'Bearer ' + token;
}

const encriptPassword = (password: string) => {
    return password && password.length > 5 ? bcrypt.hashSync(password, salt) : "abc";
}

const comparePassword = (password: string, existedPassword: string) => {
    return bcrypt.compareSync(password, existedPassword);
}


export default {
    newToken,
    encriptPassword,
    comparePassword
};
