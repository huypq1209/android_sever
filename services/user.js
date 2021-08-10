//module
const { log } = require('debug')
const userModel = require('../models/userModel')
const users=[
    {id:1,username:'admin',password:'123'},
    {id:2,username:'abc',password:'1234'},
]
// select * from users where username =?
exports.login= async function login(username){
    // const user = users.filter(us => us.username == username)[0]||null
    //select username,password from users where username = username
    const user = await userModel.findOne({username:username},'_id username password')
    
    
    return user
}