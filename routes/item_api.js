var express = require('express')
var router =express.Router()
var itemController= require('../controllers/item')
var typeController= require('../controllers/type')
const auth= require('../middle/auth')
const upload=require('../middle/upload')

// lay list sanpham
// middleware
router.get('/items',async function(req, res, next){
    const items= await itemController.get()
    const type=await typeController.get()
    
   console.log(items,type)
    res.json({
        item: items,
        type: type,
    })
});

// get 1 item

router.get('/items/:id',async function(req, res, next){
    const {params:{id}}=req
    const item= await itemController.getOne(id)
    const a= new Date(item.date)
    const b =a.toLocaleDateString()
    const type= await typeController.get()
    
    res.json({item : item,type:type,date:b})
});

// delete 1 item

module.exports = router