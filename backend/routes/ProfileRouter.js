const express = require('express');
const { register, login,getAuth} = require('../Controllers/ProfileControllers');
const isAuth = require('../middlewares/Author');
const { registerValid ,validator, loginValidator} = require('../middlewares/ProfileVallidators');
const router = express.Router();


router.post('/register',registerValid(),validator,register)
router.post('/login',loginValidator(),validator,login)
router.get('/isAuth',isAuth,getAuth)
module.exports=router