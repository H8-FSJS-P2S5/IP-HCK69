const bcrypt = require('bcrypt')

const hashPassword = (plainPass) => {
    // console.log(plainPass,'ssssssssssssssss');
    return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(10));
}

const comparePassword = (plainPass, hashPassword) => {
    return bcrypt.compareSync(plainPass, hashPassword)
}

module.exports = { hashPassword, comparePassword }