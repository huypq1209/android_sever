var type=[
    
        {id:1,name:'MOBA'},
        {id:2,name:'Bắn súng'},
        {id:3,name:'Thám hiểm'},
        {id:4,name:'Mobile Game'},   
]

const typeModel=require('../models/typeModel')
exports.get = async function(){
        return await typeModel.find();
}
exports.getOne = async function(id){
        return await typeModel.findById(id);
}