var express = require('express')
var router =express.Router()
var billController= require('../controllers/bill')
var itemController= require('../controllers/item')
var guestController= require('../controllers/guest')
const auth= require('../middle/auth')
const upload=require('../middle/upload')
const socketAPI = require('../socketIO/socket_api')

router.get('/',[auth.checklogin],async function(req, res, next){
    const bill=await billController.get()
    const items= await itemController.get()
    const guest=await guestController.get()
    
    
    res.render('bill', {
        bill:bill,
        item: items,
        guest: guest,
        title: "Trang chủ"
    })
});

module.exports=router