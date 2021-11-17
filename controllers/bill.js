const billService=require('../services/bill')

exports.get = async function getAllitem(){
    return await billService.get()
}

exports.getOne = async function getOneitem(id){
    return await billService.getOne(id)
}
exports.getByGuestId=async(guestId)=>{
    return await billService.getByGuestId(guestId)
}
exports.getByItemId=async(itemId)=>{
    return await billService.getByGuestId(itemId)
}
exports.delete = async (id)=>{
   await billService.delete(id);
}
// exports.update = async (params,body)=>{
//     let {id}=params;
//     let {name,price,date,type,img,chitiet}=body;
//     await billService.update({id, name, price, date, type,img,chitiet})

// }
exports.insert = async (body)=>{
    let {name,price,date,itemId,guestId}=body;
    await billService.insert({name,price,date,itemId,guestId})

}