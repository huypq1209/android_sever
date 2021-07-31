const mongoose = require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;


const itemSchema = new Schema({
    id: {
        type: ObjectId
    },
    name: { type: String, },
    price: { type: Number, },
    date: { type: String, },
    img: { type: String, },
    type: { type: Schema.Types.ObjectId,ref:'itemtype' },
    chitiet: { type: String, },
   
   
})

module.exports = mongoose.model('item',itemSchema)


// { id: 1, name: 'Leagues of Legend', price: '123000', date: '2009-01-02', img: "/images/LOL.jpg", type: 1, chitiet: "Hiện chưa có thông tin chi tiết cho tựa game này" },
