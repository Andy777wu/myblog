const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {type: String,require:[true,'用户名不能为空']},
    password: {type: String,require:[true,'密码不能为空']},
    role: String
}, {
    timestamps: true
})

const UserModel = mongoose.model('UserSchema',UserSchema)

module.exports = UserModel