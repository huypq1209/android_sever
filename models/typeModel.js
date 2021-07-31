const mongoose = require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;


const typeSchema = new Schema({
    id: {
        type: ObjectId
    },
    name: { type: String, },
   
})

module.exports = mongoose.model('itemtype',typeSchema)

// alias:'username'