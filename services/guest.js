const { log } = require('debug')
const guestModel = require('../models/guestModel')
// const users=[
//     {id:1,username:'admin',password:'123'},
//     {id:2,username:'abc',password:'1234'},
// ]
// select * from users where username =?
exports.login= async function login(username){
    // const user = users.filter(us => us.username == username)[0]||null
    //select username,password from users where username = username
    const guest = await guestModel.findOne({username:username},'_id username password fullname phone')
    
    
    return guest
}
exports.signup= async function signup(username,password,phone,fullname){
    const guest=new guestModel({username,password,phone,fullname})
    // const guest = await guestModel.findOne({username:username},'_id username password phone fullname')
    // console.log(guest.username)
    
    return await guest.save()
}
exports.getOne = async function getOneitem(id) {
    return guestModel.findById(id)
 }
 exports.update = async (st) => {
    let oneitem =await guestModel.findById(st.id)
    if (oneitem){
       oneitem.username = oneitem.username
       oneitem.password = st.password
       oneitem.phone = oneitem.phone
       oneitem.fullname = oneitem.fullname
       return await oneitem.save()
    }
    
 }
