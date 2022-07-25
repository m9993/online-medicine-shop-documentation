/** Express router providing login related routes
 * @module controllers/login
 * @requires express
 */

/**
 * Express router to mount login related functions on.
 * @type {object}
 * @const
 * @namespace loginController
 */

/**
 * express module
 * @const
 */
const express       = require('express');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const userModel		= require.main.require('./models/userModel');

/**
 * Routes to login page.
 * @name get/
 * @function
 * @memberof module:controllers/login~loginController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/',(req, res)=>{
    res.render('login/index');
});

/**
 * Post request for user authentication with inputs:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>uemail</td>
		<td>string</td>
	</tr>
	<tr>
		<td>upassword</td>
		<td>string</td>
	</tr>
</table>
 * If no permission/ input validation error exists then sends error messages.
 * If fail then route to login.
 * If user role is admin, routes to adminHome else userHome.
 * @name post/
 * @function
 * @memberof module:controllers/login~loginController
 * @inner
 * @param {string} path - Express path
 * @param {array} validation - express-validator array
 * @param {callback} middleware - Express middleware (req, res).
 */
router.post('/', [
    // Email nameField & empty,email validation
    body('uemail')
    .isEmail()
    .withMessage('Email is required'),
    
    // password nameField & empty validation
    body('upassword')
    .notEmpty()
    .withMessage('Password is required')

  ], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('login/index', {err:errors.array()});
    }else{
      var user={
        uemail: req.body.uemail, 
        upassword: req.body.upassword
      };
      userModel.validate(user,(status)=>{
        if(status){
          userModel.getUser(user, (results)=>{
            if(results[0].urole=='admin' && results[0].ustatus=='valid'){
              req.session.user=results[0];
              res.redirect('/user/vuser/adminHome');
            }
            else if(results[0].urole=='customer' && results[0].ustatus=='valid'){
              req.session.user=results[0];
              res.redirect('/medicine/vuser/customerHome');
            }
            else{
              res.send("You don't have permission to login");
            }
          });
          
        }else{
          res.redirect('/login');
        }
      });

    }
  });



module.exports = router;