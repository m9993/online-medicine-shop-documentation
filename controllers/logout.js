/** Express router providing logout related routes
 * @module controllers/logout
 * @requires express
 */

/**
 * Express router to mount logout related functions on.
 * @type {object}
 * @const
 * @namespace logoutController
 */

/**
 * express module
 * @const
 */
const express 	= require('express');
const router 	= express.Router();


/**
 * Logout with destroying all sessions and routes to login page.
 * @name get/logout
 * @function
 * @memberof module:controllers/logout~logoutController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/', (req, res)=>{

	req.session.destroy();
	// req.session.uname = undefined;
	//res.cookie('uname', '');	
	// res.clearCookie('uname');
	res.redirect('/login');
});


module.exports = router;



