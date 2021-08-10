const userService = require('../services/user')



exports.login= async function login(username,password){
    const user= await userService.login(username)
    console.log(username,password,user)
    if(!user){
        return null
    }

    // check pass
    if(user.password != password){
        return null
    }
    return {_id:user._id,username:user.username}
}