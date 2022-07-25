/** Express router providing medicine related routes
 * @module controllers/medicine
 * @requires express
 */

/**
 * Express router to mount medicine related functions on.
 * @type {object}
 * @const
 * @namespace medicineController
 */

/**
 * express module
 * @const
 */

const express       = require('express');
const session = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const medicineModel		= require.main.require('./models/medicineModel');
const customerCart		= require.main.require('./models/customerCart');

/**
 * Checks user session.
 * If user not logged in then redirects to login page else calls next middleware
 * @name get/*
 * @function
 * @memberof module:controllers/medicine~medicineController
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
 * Routes to admin medicine tab with medicine list.
 * @name get/vmedicine/adminMedicine
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/vmedicine/adminMedicine',  (req, res)=>{
	medicineModel.getAllMedicine((results)=>{
		res.render('vmedicine/adminMedicine',{medicine:results, user:req.session.user});
	});	
});

/**
 * Routes to admin medicine add.
 * @name get/addMedicine
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/addMedicine',(req, res)=>{
    res.render('vMedicine/adminAddMedicine');
});

/**
 * Post request for add medicine with inputs:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mname</td>
		<td>string</td>
	</tr>
	<tr>
		<td>mgenre</td>
		<td>string</td>
	</tr>
	<tr>
		<td>mprice</td>
		<td>number</td>
	</tr>
	<tr>
		<td>mstatus</td>
		<td>bool</td>
	</tr>
</table>
 * If success then sends success alert.
 * If fail then sends danger alert.
 * @name post/addMedicine
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.post('/addMedicine',(req, res)=>{
    var medicine= {
		mname:req.body.mname,
		mgenre:req.body.mgenre,
		mprice:req.body.mprice,
		mstatus:req.body.mstatus
	};
	medicineModel.insert(medicine,(status)=>{
		if(status){
			res.send("Added Successfully!");                               
		}else{
			res.send("Adding Failed!");                
		}
	});

});

/**
 * Routes to medicine edit page with query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/adminEditMedicine/:mid
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/adminEditMedicine/:mid',(req, res)=>{
	medicineModel.getById(req.params.mid,(results)=>{		
		res.render('vmedicine/adminEditMedicine',{editMedicine: results[0]});
	});
});

/**
 * Post request for edit medicine with inputs:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mname</td>
		<td>string</td>
	</tr>
	<tr>
		<td>mgenre</td>
		<td>string</td>
	</tr>
	<tr>
		<td>mprice</td>
		<td>number</td>
	</tr>
	<tr>
		<td>mstatus</td>
		<td>bool</td>
	</tr>
</table>
and query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mid</td>
		<td>number</td>
	</tr>
</table>
 * If success then sends success alert.
 * If fail then sends danger alert.
 * @name post/editMedicine/:mid
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.post('/editMedicine/:mid',(req, res)=>{
	var medicine= {
		mid:req.params.mid,
		mname:req.body.mname,
		mgenre:req.body.mgenre,
		mprice:req.body.mprice,
		mstatus:req.body.mstatus
	};
	medicineModel.update(medicine,(status)=>{
		if(status){
			res.send("Updated Successfully!");                               
		}else{
			res.send("Update Failed!");                
		}
	});
});

/**
 * Delete medicine with query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/adminDeletemedicine/:mid
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/adminDeletemedicine/:mid',(req, res)=>{
	medicineModel.delete(req.params.mid,(status)=>{		
		if(status){
			res.send("Deleted Successfully!");                               
		}else{
			res.send("Deletation Failed!");                
		}
	});
});

/**
 * Routes to customer medicine dashboard with medicine list with cart data from session
 * @name get/vuser/customerHome
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/vuser/customerHome',  (req, res)=>{
	medicineModel.getAllMedicine((results)=>{
		res.render('vuser/customerHome',{medicine:results, user:req.session.user, cartData: req.session.cart});
	});	
});

/**
 * Adds medicine to cart with query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/add-to-cart/:mid
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/add-to-cart/:mid',  (req, res)=>{
	// 
	var medicineId= req.params.mid;
    medicineModel.getById(medicineId,(results)=>{
        if(typeof req.session.cart=='undefined'){req.session.cart=[];}
        
        var oldCart= req.session.cart;
        customerCart.add(results[0], oldCart, (results)=>{
			req.session.cart=results;
			res.redirect('/medicine/vuser/customerHome');
			
        });        
    });
	// 
});

/**
 * Increase medicine item by one to cart with query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/addByOne/:mid
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/addByOne/:mid', (req, res)=>{
    var medicineId= req.params.mid;
    medicineModel.getById(medicineId,(results)=>{
        
        var oldCart= req.session.cart;
        customerCart.addByOne(results[0], oldCart, (results)=>{
            req.session.cart=results;
            res.redirect('/medicine/vuser/customerHome');
        });
        
        
    });
});

/**
 * Decrease medicine item by one to cart with query params:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mid</td>
		<td>number</td>
	</tr>
</table>
 * @name get/reduceByOne/:mid
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/reduceByOne/:mid', (req, res)=>{
    var medicineId= req.params.mid;
    medicineModel.getById(medicineId,(results)=>{
        
        var oldCart= req.session.cart;
        customerCart.reduceByOne(results[0], oldCart, (results)=>{
            req.session.cart=results;
            res.redirect('/medicine/vuser/customerHome');
        });
        
        
    });
});

/**
 * Search medicine with query strings:
<table style="margin-bottom:20px">
	<thead>
	<tr>
		<th>Field</th>
		<th>Type</th>
	</tr>
	</thead>
	<tr>
		<td>mSearchKey</td>
		<td>string</td>
	</tr>
	<tr>
		<td>mSearchFilter</td>
		<td>string</td>
	</tr>
</table>
 * @name get/customer/search
 * @function
 * @memberof module:controllers/medicine~medicineController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (req, res).
 */
router.get('/customer/search', (req, res)=>{
	var search={	
		mSearchKey:req.query.mSearchKey,
		mSearchFilter:req.query.mSearchFilter,
	};
	medicineModel.search(search,(results)=>{
		res.json({medicine: results});
		// console.log(results);
	});
});


module.exports = router;