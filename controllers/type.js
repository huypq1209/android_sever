const typeService = require('../services/type')

exports.get=async()=>{
        return await typeService.get();
};
exports.getOne=async(id)=>{
        return await typeService.getOne(id);
};