/** Express router providing registration related routes
 * @module controllers/registration
 * @requires express
 */

/**
 * Express router to mount registration related functions on.
 * @type {object}
 * @const
 * @namespace registrationController
 */

/**
 * express module
 * @const
 */

const express       = require('express');
const session = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const userModel		= require.main.require('./models/userModel');

/**
 * Routes to registration page.
 * @name get/
 * @function
 * @memberof module:controllers/registration~registrationController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/',(req, res)=>{
    res.render('vuser/registration',{urole: 'customer'});
});

/**
 * Routes to registration page.
 * @name get/admin
 * @function
 * @memberof module:controllers/registration~registrationController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/admin',(req, res)=>{
    res.render('vuser/registration',{urole: req.session.user.urole});
});

/**
 * Post request from user registration, with by default unauthorized (status = invalid) with inputs:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>uname</td>
		<td>string</td>
	</tr>
	<tr>
		<td>uphone</td>
		<td>string</td>
	</tr>
	<tr>
		<td>uemail</td>
		<td>string</td>
	</tr>
	<tr>
		<td>urole</td>
		<td>bool</td>
	</tr>
	<tr>
		<td>upassword</td>
		<td>string</td>
	</tr>
</table>
 * If not registered/ input validation error exists then sends error messages.
 * @name post/
 * @function
 * @memberof module:controllers/registration~registrationController
 * @inner
 * @param {string} path - Express path
 * @param {array} validation - express-validator array
 * @param {callback} middleware - Express middleware (req, res).
 */
router.post('/', [
    //
    body('uname')
    .notEmpty()
    .withMessage('uname is required'),
    
    //
    body('uphone')
    .notEmpty()
    .withMessage('uphone is required'),
    
    // Email nameField & empty,email validation
    body('uemail')
    .isEmail()
    .withMessage('uemail is required'),

    // 
    body('urole')
    .notEmpty()
    .withMessage('urole is required'),
    
    
    // password nameField & empty validation
    body('upassword')
    .notEmpty()
    .withMessage('upassword is required')

  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors.array());
    }else{
        user={
            uname: req.body.uname,
            uphone: req.body.uphone,
            uemail: req.body.uemail,
            urole: req.body.urole,
            ustatus: "invalid",
            upassword: req.body.upassword
        };

        userModel.insert(user,(status)=>{
            if(status){
                res.send("Registration Successful!");                               
            }else{
                res.send("Registration Failed!");                
            }
            
        });

    }




  });


/**
 * Post request from admin for registration with by default authorized (status = valid) with inputs:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>uname</td>
		<td>string</td>
	</tr>
	<tr>
		<td>uphone</td>
		<td>string</td>
	</tr>
	<tr>
		<td>uemail</td>
		<td>string</td>
	</tr>
	<tr>
		<td>urole</td>
		<td>bool</td>
	</tr>
	<tr>
		<td>upassword</td>
		<td>string</td>
	</tr>
</table>
 * If not registered/ input validation error exists then sends error messages.
 * @name post/admin
 * @function
 * @memberof module:controllers/registration~registrationController
 * @inner
 * @param {string} path - Express path
 * @param {array} validation - express-validator array
 * @param {callback} middleware - Express middleware (req, res).
 */
  router.post('/admin', [
    //
    body('uname')
    .notEmpty()
    .withMessage('uname is required'),
    
    //
    body('uphone')
    .notEmpty()
    .withMessage('uphone is required'),
    
    // Email nameField & empty,email validation
    body('uemail')
    .isEmail()
    .withMessage('uemail is required'),

    // 
    body('urole')
    .notEmpty()
    .withMessage('urole is required'),
    
    
    // password nameField & empty validation
    body('upassword')
    .notEmpty()
    .withMessage('upassword is required')

  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors.array());
    }else{
        user={
            uname: req.body.uname,
            uphone: req.body.uphone,
            uemail: req.body.uemail,
            urole: req.body.urole,
            ustatus: "invalid",
            upassword: req.body.upassword
        };

        userModel.insert(user,(status)=>{
            if(status){
                res.send("Registration Successful!");                               
            }else{
                res.send("Registration Failed!");                
            }
            
        });

    }




  });

// res.render('vuser/registration');


module.exports = router;