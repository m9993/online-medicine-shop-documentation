/** Express router providing order related routes
 * @module controllers/order
 * @requires express
 */

/**
 * Express router to mount order related functions on.
 * @type {object}
 * @const
 * @namespace orderController
 */

/**
 * express module
 * @const
 */

const express       = require('express');
const session = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const orderModel		= require.main.require('./models/orderModel');


/**
 * Checks user session.
 * If user not logged in then redirects to login page else calls next middleware
 * @name get/*
 * @function
 * @memberof module:controllers/order~orderController
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
 * Post request for add order with inputs:
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
	<tr>
		<td>opaymentmethod</td>
		<td>string</td>
	</tr>
	<tr>
		<td>ostatus</td>
		<td>bool</td>
	</tr>
	<tr>
		<td>oamount</td>
		<td>number</td>
	</tr>
	<tr>
		<td>oaddress</td>
		<td>string</td>
	</tr>
</table>
 * If success then sends success alert.
 * If fail then sends danger alert.
 * @name post/addOrder
 * @function
 * @memberof module:controllers/order~orderController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.post('/addOrder',  (req, res)=>{
	var order={
		uid: req.session.user.uid.toString(),
		opaymentmethod: req.body.opaymentmethod,
		ostatus: 'pending',
		oamount: req.body.oamount,
		oaddress: req.body.oaddress,
	};
	orderModel.insert(order,(status)=>{
		if(status){
			req.session.cart=undefined;
			res.redirect('/medicine/vuser/customerHome');
		}else{
			res.send('Order Failed.');
		}
	});
});

/**
 * Routes to customer order tab with his/her order history.
 * @name get/vorder/customerOrder
 * @function
 * @memberof module:controllers/order~orderController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/vorder/customerOrder',  (req, res)=>{
	orderModel.getById(req.session.user.uid.toString(), (results)=>{
		res.render('vorder/customerOrder',{ order: results, user:req.session.user, cartData: req.session.cart});
	});	
});

/**
 * Routes to admin order tab to show every order history in the system.
 * @name get/vorder/adminOrder
 * @function
 * @memberof module:controllers/order~orderController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/vorder/adminOrder',  (req, res)=>{
	orderModel.getAllOrder((results)=>{
		res.render('vorder/adminOrder',{ order: results, user:req.session.user});
	});	
});

/**
 * Admin confirm order with query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>oid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/adminConfirm/:oid
 * @function
 * @memberof module:controllers/order~orderController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/adminConfirm/:oid',  (req, res)=>{
	orderModel.confirmOstatus(req.params.oid,(status)=>{
		if(status){
			res.redirect('/order/vorder/adminOrder');
		}else{
			res.send('Order status confirm Failed.');
		}
	});	
});

/**
 * Admin cancel order with query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>oid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/adminCancel/:oid
 * @function
 * @memberof module:controllers/order~orderController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/adminCancle/:oid',  (req, res)=>{
	orderModel.cancleOstatus(req.params.oid,(status)=>{
		if(status){
			res.redirect('/order/vorder/adminOrder');
		}else{
			res.send('Order status cancle Failed.');
		}
	});	
});



module.exports = router;