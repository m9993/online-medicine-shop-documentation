/** Makes database connection, provides getResults and execute related functions.
 * @module models/db
 */

/**
 * Connects database, provides getResults and execute related functions.
 * @type {object}
 * @const
 * @namespace dbModel
 */

const mysql 	= require('mysql');

/**
 * Makes connection with database
 * @function
 * @memberof module:models/db~dbModel
 * @inner
 * @param {callback} callback - Returns connection
 */
var getConnection = function(callback){
	var connection = mysql.createConnection({
		  host     : '127.0.0.1',
		  database : 'onlinemedicalshop',
		  user     : 'root',
		  password : ''
		});
	 
	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }
	  console.log('connected as id ' + connection.threadId);

	});

	callback(connection);

}

module.exports = {
	/**
	 * Get results from database
	 * @function
	 * @memberof module:models/db~dbModel
	 * @inner
	 * @param {string} sql - Receives sql
	 * @param {callback} callback - Returns data
	 */
	getResults: function (sql, callback){
		getConnection(function(connection){
			connection.query(sql , function (error, results) {
				callback(results);
			});
			
			connection.end(function(err) {
			  console.log('connection end...');
			});		
		});

	},

	/**
	 * Execute SQL in database
	 * @function
	 * @memberof module:models/db~dbModel
	 * @inner
	 * @param {string} sql - Receives sql
	 * @param {callback} callback - Returns status
	 */
	execute: function (sql, callback){
		getConnection(function(connection){
			connection.query(sql , function (error, status) {
				
				if(status){
					callback(true);
				}else{
					callback(false);
				}
			});
			
			connection.end(function(err) {
			  console.log('connection end...');
			});		
		});
	}
}




