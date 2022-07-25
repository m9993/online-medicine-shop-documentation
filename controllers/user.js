/** Express router providing user related routes
 * @module controllers/user
 * @requires express
 */

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userController
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
 * Checks user session.
 * If user not logged in then redirects to login page else calls next middleware
 * @name get/*
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res, next).
 */
router.get('*',  (req, res, next)=>{
	if(req.session.user == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});

/**
 * Routes to admin Home tab with user list.
 * @name get/vuser/adminHome
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/vuser/adminHome',(req, res)=>{
	userModel.getAllUser((results)=>{
		res.render('vuser/adminHome', {user: req.session.user, allUser: results});
	});
});

/**
 * Routes to user add page.
 * @name get/addUser
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/addUser',(req, res)=>{
    res.render('vuser/addUser', {user: req.session.user});
});

/**
 * Admin routes to user edit page with user data and sends query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>uid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/edit/admin/:uid
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/edit/admin/:uid',(req, res)=>{
	var uid=req.params.uid;
	userModel.getById(uid,(results)=>{		
		res.render('vuser/editProfile',{urole: 'admin', user:results[0]});
	});
});

/**
 * Customer routes to his edit page with his data and sends query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>uid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/edit/customer/:uid
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/edit/customer/:uid',(req, res)=>{
	var uid=req.params.uid;
	userModel.getById(uid,(results)=>{		
		res.render('vuser/editProfile',{urole: 'customer', user:results[0]});
	});
});


/**
 * Post request from admin for user update with inputs:
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
		<td>ustatus</td>
		<td>bool</td>
	</tr>
	<tr>
		<td>upassword</td>
		<td>string</td>
	</tr>
</table>
 * If not updated/ input validation error exists then sends error messages.
 * @name post/edit/admin/:uid
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {array} validation - express-validator array
 * @param {callback} middleware - Express middleware (req, res).
 */
router.post('/edit/admin/:uid', [
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
	
	// 
    body('ustatus')
    .notEmpty()
    .withMessage('ustatus is required'),
    
    
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
            uid: req.params.uid,
            uname: req.body.uname,
            uphone: req.body.uphone,
            uemail: req.body.uemail,
            urole: req.body.urole,
            ustatus: req.body.ustatus,
            upassword: req.body.upassword
        };

        userModel.update(user,(status)=>{
            if(status){
                res.redirect('/user/vuser/adminHome');
            }else{
                res.send('Update failed');
            }
            
        });

    }
});


/**
 * Post request from customer for his/her profile update with inputs:
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
		<td>upassword</td>
		<td>string</td>
	</tr>
</table>
 * If not updated/ input validation error exists then sends error messages.
 * @name post/edit/customer/:uid
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {array} validation - express-validator array
 * @param {callback} middleware - Express middleware (req, res).
 */
router.post('/edit/customer/:uid', [
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
            uid: req.params.uid,
            uname: req.body.uname,
            uphone: req.body.uphone,
            uemail: req.body.uemail,
            urole: 'customer',
            ustatus: 'valid',
            upassword: req.body.upassword
        };

        userModel.update(user,(status)=>{
            if(status){
                res.redirect('/user/vuser/customerHome');
            }else{
                res.send('Update failed');
            }
            
        });

    }
});

/**
 * Removes user with query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>uid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/delete/admin/:uid
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/delete/admin/:uid', (req, res)=>{
	userModel.delete(req.params.uid,(status)=>{
		if(status){
			res.redirect('/user/vuser/adminHome');
		}else{
			res.send('delete failed');
		}
	});
});





module.exports = router;