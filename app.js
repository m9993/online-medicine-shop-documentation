/**
 * @file app.js is the root file for this example app
 * @author Muntasir Alam
 * @see <a target='_blank' href="https://m9993.github.io/me">Profile</a>
 */

//declaration
/**
 * express module
 * @const
 */
const express 						= require('express');	

/**
 * Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 * @const
 */
const bodyParser 					= require('body-parser');

/**
 * Manages Session
 * @const
 */
const exSession 					= require('express-session');

/**
 * Manages Cookies
 * @const
 */
const cookieParser 					= require('cookie-parser');

/**
 * Validation for input fields
 * @const
 */
const {body, validationResult} 		= require('express-validator');


/**
 * Route to login controller
 * @const
 */
const login							= require('./controllers/login');

/**
 * Route to logout controller
 * @const
 */
const logout						= require('./controllers/logout');

/**
 * Route to user controller
 * @const
 */
const user							= require('./controllers/user');

/**
 * Route to medicine controller
 * @const
 */
const medicine						= require('./controllers/medicine');

/**
 * Route to order controller
 * @const
 */
const order							= require('./controllers/order');

/**
 * Route to registration controller
 * @const
 */
const registration					= require('./controllers/registration');

/**
 * Configure express
 * @const
 */
const app							= express();

/**
 * App port number
 * @const
 */
const port							= 3000;

app.set('view engine', 'ejs');


//middleware
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));


app.use('/', login);
app.use('/login', login);
app.use('/logout', logout);
app.use('/user', user);
app.use('/medicine', medicine);
app.use('/order', order);
app.use('/registration', registration);


//router
// app.get('/', (req, res)=>{
// 	res.render('a');
// });

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});