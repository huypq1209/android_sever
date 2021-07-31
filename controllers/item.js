const itemService = require('../services/item')


exports.get = async function getAllitem(){
    return await itemService.get()
}

exports.getOne = async function getOneitem(id){
    return await itemService.getOne(id)
}
exports.delete = async (id)=>{
   await itemService.delete(id);
}
exports.update = (params,body)=>{
    let {id}=params;
    let {name,price,date,type,img,chitiet}=body;
    itemService.update({id, name, price, date, type,img,chitiet})

}
exports.insert = async (body)=>{
    // const uuid =  () => {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //       return v.toString(16);
    //     });
    //   } 
    // let id = uuid()
    let {name,price,date,type,img,chitiet}=body;
    await itemService.insert({name, price, date, type,img,chitiet})

}