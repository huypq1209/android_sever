var express = require('express')
var router =express.Router()
var itemController= require('../controllers/item')
var typeController= require('../controllers/type')
const auth= require('../middle/auth')
const upload=require('../middle/upload')

// lay list sanpham
// middleware
router.get('/',[auth.checklogin],async function(req, res, next){
    const items= await itemController.get()
    const type=await typeController.get()
    
   console.log(items,type)
    res.render('item', {
        item: items,
        type: type,
        title: "Trang chủ"
    })
});

// get 1 item

router.get('/detail/:id',[auth.checklogin],async function(req, res, next){
    const {params:{id}}=req
    const item= await itemController.getOne(id)
    const a= new Date(item.date)
    const b =a.toLocaleDateString()
    const type= await typeController.get()
    
    res.render('detail',{item : item,type:type,date:b,title:"Chi tiết"})
});

// delete 1 item
router.delete('/delete/:id',[auth.checklogin],async function(req, res, next){
    const {params:{id}}=req
    await itemController.delete(id)
    res.json({result : true})
});
//update 1 item
router.post('/update/:id',[auth.checklogin, upload.single('img')],async function(req, res, next){
    let{params, body, file}=req   
    console.log(req);
    if(file){
        let img='http://192.168.31.155:3000/images/'+file.originalname
        body={...body, img}
    }
    await itemController.update(params, body)
    res.redirect('/items')
});
//insert 1 item
router.post('/insert',[auth.checklogin],async function(req, res, next){
    let{body}=req
    await itemController.insert(body)
    res.redirect('/items')
});
module.exports = router