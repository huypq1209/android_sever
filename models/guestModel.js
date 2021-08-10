const mongoose = require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;


const guestShema = new Schema({
    id: {
        type: ObjectId
    },
    username: { type: String },
    password: { type: String },
    phone: { type: String },
    fullname: { type: String },

})

module.exports = mongoose.model('guest',guestShema)