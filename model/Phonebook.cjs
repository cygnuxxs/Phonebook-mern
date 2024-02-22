const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema(({
    name : { type : String, required : true },
    phone : { type : Number, required : true, maxlength : 10, minlength : 10 }
}))

const PhoneBook = mongoose.model('numbers', phoneSchema)

module.exports = PhoneBook
