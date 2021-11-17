const billModel= require('../models/billModel')
const guestModel = require('../models/guestModel')
const socketAPI = require('../socketIO/socket_api')

// SELECT ALL 
exports.get = async function getAllitem() {
   
    return await billModel.find()
    
 }
 exports.delete = async(id) => {
   // socketAPI.sendNofication('-1 item')
   await billModel.remove({_id:id})
};
 // select * from bill where id=?
 exports.getOne = async function getOneitem(id) {
    return await billModel.findById(id)
 }
// select where guestId=?
 exports.getByGuestId=async (guestId)=>{
     const bill= await billModel.find({guestId:guestId})
     return bill
 }
 // select where itemId=?
 exports.getByItemtId=async (itemId)=>{
    const bill= await billModel.findById(itemId)
    return bill
}
 exports.insert = async (st) => {
    const item = new billModel(st)
    await item.save()
 }