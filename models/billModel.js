const mongoose = require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const billSchema = new Schema({
    id: {
        type: ObjectId
    },
    price: { type: Number, },
    date: { type: String, },
    itemId: { type: Schema.Types.ObjectId,ref:'item' },
    name:{type:String,},
    guestId: { type: Schema.Types.ObjectId,ref:'guest' },  
})

module.exports = mongoose.model('bill',billSchema)