var express = require('express');
const jwt = require('jsonwebtoken')
var router = express.Router();
var userController = require('../controllers/user')
const auth = require('../middle/auth')
/* GET home page. */

//http://localhost:3000
//CRUD : create,read,update,detete

// chưa login=>> redirect qua /login
// đã login =>> qua trang item

router.get('/', [auth.checklogin], function (req, res, next) {
    res.redirect('/items')
 
});
//http://localhost:3000/canh-day/10/chieu-cao/5
//login
router.get('/login', function (req, res, next) {
  res.render('index', { title: 'Login' });
  console.log("a")
});

// Post login page
router.post('/', async function (req, res, next ) {
  const { username, password } = req.body
  const check = await userController.login(username, password)
  if (check) {
    const access_token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET_KEY)
    req.session.access_token = access_token
    res.redirect('/items')
  } else {
    res.redirect('/')
    // alert("Tên đăng nhập hoặc mật khẩu không đúng");
  }

});
//logout
router.get('/logout', function (req, res, next) {
  req.session.destroy(function(err){
    res.redirect('/login');
  })
  
});


module.exports = router;
