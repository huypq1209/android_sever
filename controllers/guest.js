const guestService = require('../services/guest')
var bcrypt = require('bcryptjs');


exports.login= async function login(username,password){
    const guest= await guestService.login(username)
    // console.log(username,password,guest)
    if(!guest){
        return null
    }

    // check pass
    const checkPass= await bcrypt.compare(password,guest.password)
    if(!checkPass){
        return null
    }
    return {_id:guest._id,username:guest.username,phone:guest.phone,fullname:guest.fullname}
}
exports.signup= async function signup(username,password,password_confirm,phone,fullname){
    if(password!=password_confirm){
        return null;
    }
    let guest= await guestService.login(username)
    
    if(guest){
        return null
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    guest=await guestService.signup(username,hash,phone,fullname)
    // check pass
   
    return {_id: guest._id}
    
}
exports.update = async (params,body)=>{
    let {id}=params;
    let guest= await guestService.getOne(id)
    if(!guest){
        return null
    }
    let {current_password,password,password_confirm}=body;
    const checkPass= await bcrypt.compare(current_password,guest.password)
    if(!checkPass){
        return null
    }else{
        if(password!=password_confirm){
            return null
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        password=hash
    }    
    return  await guestService.update({id,password})
    
    

}

exports.getOne = async function getOneitem(id){
        return await guestService.getOne(id)
    }