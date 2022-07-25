/** Provides results and execute related functions.
 * @module models/user
 */

/**
 * It provides results and execute related functions.
 * @type {object}
 * @const
 * @namespace userModel
 */

const db    = require('./db');

module.exports={
	/**
	 * Authenticates user in database
	 * @function
	 * @memberof module:models/user~userModel
	 * @inner
	 * @param {object} user - Takes email and password as object
	 * @param {callback} callback - Returns status
	 */
    validate: (user, callback)=>{
        var sql="select * from user where uemail='"+user.uemail+"' and upassword='"+user.upassword+"'";
        db.getResults(sql, (results)=>{
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
        });
    },

	/**
	 * Gets user in database
	 * @function
	 * @memberof module:models/user~userModel
	 * @inner
	 * @param {object} user - Takes email and password as object
	 * @param {callback} callback - Returns user
	 */
    getUser: (user,callback)=>{
        var sql="select * from user where uemail='"+user.uemail+"' and upassword='"+user.upassword+"'";
        db.getResults(sql, (results)=>{
			callback(results);
        });
    },

	/**
	 * Adds user in database
	 * @function
	 * @memberof module:models/user~userModel
	 * @inner
	 * @param {object} user - Takes user object
	 * @param {callback} callback - Returns status
	 */
    insert: (user,callback)=>{
        var sql="INSERT INTO `user`(`uname`, `uemail`, `urole`, `ustatus`, `upassword`, `uphone`) VALUES ('"+user.uname+"','"+user.uemail+"','"+user.urole+"','"+user.ustatus+"','"+user.upassword+"','"+user.uphone+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },

	/**
	 * Gets all users in database
	 * @function
	 * @memberof module:models/user~userModel
	 * @inner
	 * @param {callback} callback - Returns all users
	 */
    getAllUser: (callback)=>{
        var sql="select * from user";
        db.getResults(sql, (results)=>{
			callback(results);
        });
    },

	/**
	 * Gets user from database
	 * @function
	 * @memberof module:models/user~userModel
	 * @inner
	 * @param {number} uid - Takes user id
	 * @param {callback} callback - Returns user
	 */
	getById: function(uid, callback){
		var sql = "select * from user where uid= '"+uid+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
    },

	/**
	 * Updates user in database
	 * @function
	 * @memberof module:models/user~userModel
	 * @inner
	 * @param {object} user - Takes user
	 * @param {callback} callback - Returns status
	 */
    update: function(user,callback){
        var sql="UPDATE `user` SET `uname`='"+user.uname+"',`uemail`='"+user.uemail+"',`urole`='"+user.urole+"',`ustatus`='"+user.ustatus+"',`upassword`='"+user.upassword+"',`uphone`='"+user.uphone+"' WHERE uid='"+user.uid+"'";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },

	/**
	 * Removes user in database
	 * @function
	 * @memberof module:models/user~userModel
	 * @inner
	 * @param {number} uid - Takes uid
	 * @param {callback} callback - Returns status
	 */
    delete: function(uid, callback){
		var sql="DELETE FROM user WHERE uid='"+uid+"'";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

}