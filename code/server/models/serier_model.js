const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const SerierSchema = new Schema({
    serier: {type:String,required:[true,'系列不能为空']},
    serierItem: {type:String,required:[true,'子系列不能为空']},
    intro: {type:String,required:[true,'简介不能为空']},
    imgSrc: {data: Buffer, contentType: String},
}, {
    timestamps: true
})

const SerierModel = mongoose.model('SerierModel',SerierSchema)

module.exports = SerierModel