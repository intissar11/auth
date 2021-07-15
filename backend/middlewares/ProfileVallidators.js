const {body,validationResult,check} = require('express-validator');

const registerValid=()=>[
   
  body('FirstName',"FirstName is required").notEmpty(),
  body('LastName',"LastName is required").notEmpty(),
  body('Email',"it should an Email").isEmail(),
  body('Password',"password should contain at least 6 caracteres").isLength({min:6})
]
const loginValidator = () => 
    [
      check('Email','username or email is required').notEmpty(),
      check('Password','password is required').notEmpty()
    ]

const validator=(req,res,next)=>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}
else {
    next()
}

}
    module.exports={registerValid,validator,loginValidator}