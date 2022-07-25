/** Provides results and execute related functions.
 * @module models/order
 */

/**
 * It provides results and execute related functions.
 * @type {object}
 * @const
 * @namespace orderModel
 */

const db    = require('./db');

module.exports={
	/**
	 * Adds order in database
	 * @function
	 * @memberof module:models/order~orderModel
	 * @inner
	 * @param {object} order - Takes order object
	 * @param {callback} callback - Returns status
	 */
    insert: (order,callback)=>{
        var sql="INSERT INTO `orders`(`uid`, `otime`, `opaymentmethod`, `ostatus`, `oamount`, `oaddress`) VALUES ('"+order.uid+"', NOW(), '"+order.opaymentmethod+"', '"+order.ostatus+"', '"+order.oamount+"', '"+order.oaddress+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	/**
	 * Gets order from database with  user id
	 * @function
	 * @memberof module:models/order~orderModel
	 * @inner
	 * @param {number} uid - Takes user id
	 * @param {callback} callback - Returns order
	 */
	getById: function(uid, callback){
		var sql = "select * from orders where uid= '"+uid+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
    },

	/**
	 * Get all orders from database
	 * @function
	 * @memberof module:models/order~orderModel
	 * @inner
	 * @param {callback} callback - Returns all orders
	 */
	getAllOrder: function(callback){
		var sql = "select * from orders";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	/**
	 * Confirm order in database
	 * @function
	 * @memberof module:models/order~orderModel
	 * @inner
	 * @param {number} oid - Takes order id
	 * @param {callback} callback - Returns status
	 */
	confirmOstatus: (oid,callback)=>{
        var sql="UPDATE `orders` SET `ostatus`= 'confirmed' WHERE oid='"+oid+"'";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	/**
	 * Cancel order in database
	 * @function
	 * @memberof module:models/order~orderModel
	 * @inner
	 * @param {number} oid - Takes order id
	 * @param {callback} callback - Returns status
	 */
	cancleOstatus: (oid,callback)=>{
        var sql="UPDATE `orders` SET `ostatus`= 'cancled' WHERE oid='"+oid+"'";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
   

}