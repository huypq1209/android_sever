var express = require('express')
var router = express.Router()
var itemController = require('../controllers/item')
var typeController = require('../controllers/type')
var userController = require('../controllers/user')
var billController = require('../controllers/bill')
var guestController = require('../controllers/guest')
const auth = require('../middle/auth')
const upload = require('../middle/upload')
const jwt = require('jsonwebtoken')
const socketAPI = require('../socketIO/socket_api')
// lay list sanpham
// middleware
router.get('/items', [auth.checklogin], async function (req, res, next) {
  const items = await itemController.get()
  const type = await typeController.get()
  res.json({
    item: items,
    type: type,
  })
});

// get 1 item

router.get('/items/:id', async function (req, res, next) {
  const { params: { id } } = req
  const item = await itemController.getOne(id)
  const type = await typeController.get()
  res.json({ item: item, type: type })
});
router.delete('/delete/:id', async function (req, res, next) {
  const { params: { id } } = req
  await itemController.delete(id)
  res.json({ result: true })
});
//login
router.post('/login', async function (req, res, next) {
  const { username, password } = req.body
  const user = await guestController.login(username, password)
  if (user) {
    console.log(user)
    const access_token = jwt.sign(user, process.env.JWT_SECRET_KEY)
    req.session.access_token = access_token
    res.status(200).json({ status: true, user })
  } else {
    res.status(401).json({ status: false, user })

    // alert("Tên đăng nhập hoặc mật khẩu không đúng");
  }

});
router.post('/changepass/:id', async function (req, res, next) {
  let { params, body } = req

  const user = await guestController.update(params, body)
  if (user) {
    console.log(user)
    res.status(200).json({ status: true, user })
  }
  else {
    res.status(401).json({ status: false, user })
  }


});
router.post('/signup', async function (req, res, next) {
  const { username, password, password_confirm, phone, fullname } = req.body
  const user = await guestController.signup(username, password, password_confirm, phone, fullname)
  if (user) {
    console.log(user)
    const access_token = jwt.sign(user, process.env.JWT_SECRET_KEY)
    req.session.access_token = access_token
    res.status(200).json({ status: true, user })
  } else {
    res.status(401).json({ status: false, user })

    // alert("Tên đăng nhập hoặc mật khẩu không đúng");
  }

});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.status(200).json({ status: true })
  })

});
router.get('/guest/:id', async function (req, res, next) {
  const { params: { id } } = req
  const item = await guestController.getOne(id)
  res.json({ item: item })
});
// delete 1 item
//GET socket
router.get('/socket', async function (req, res, next) {
  const { msg } = req.body
  socketAPI.sendNofication(msg)
  res.status(200).json({ status: true })
});
router.get('/socket_test', async function (req, res, next) {
  res.render('socket')
});
//get all bill
router.get('/bills', [auth.checklogin], async function (req, res, next) {
  const bill = await billController.get()
  const items = await itemController.get()
  const guest = await guestController.get()


  res.json({
    bill: bill,
    item: items,
    guest: guest,

  })
});
//get bill by id 
router.get('/bills/:id', [auth.checklogin], async function (req, res, next) {
  const { params: { id } } = req
  const bill = await billController.getOne(id)

  const items = await itemController.getOne(bill.itemId)
  const type = await typeController.getOne(items.type)
  const guest = await guestController.getOne(bill.guestId)


  res.json({
    bill: bill,
    item: items,
    guest: guest,
    type: type

  })
});
router.get('/bills/guest/:id', async function (req, res, next) {
  const { params: { id } } = req
  const bill = await billController.getByGuestId(id)

  const items = await itemController.get()
  const type = await typeController.get()
  const guest = await guestController.getOne(id)


  res.json({
    bill: bill,
    item: items,
    guest: guest,
    type: type

  })
});
// add bill
router.post('/bills/insert', async function (req, res, next) {
  let { body } = req
  const bill = await billController.insert(body)
  // socketAPI.sendNofication('+1 item')

  res.json({ status: true, bill })
})
router.delete('/bills/delete/:id', async function (req, res, next) {
  const { params: { id } } = req
  await billController.delete(id)
  
  res.json({ result: true })
});
module.exports = router