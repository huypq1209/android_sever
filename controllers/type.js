const typeService = require('../services/type')

exports.get=async()=>{
        return await typeService.get();
};