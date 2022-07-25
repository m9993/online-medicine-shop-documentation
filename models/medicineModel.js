/** Provides results and execute related functions.
 * @module models/medicine
 */

/**
 * It provides results and execute related functions.
 * @type {object}
 * @const
 * @namespace medicineModel
 */

const db    = require('./db');

module.exports={
	/**
	 * Get all medicines from database
	 * @function
	 * @memberof module:models/medicine~medicineModel
	 * @inner
	 * @param {callback} callback - Returns all medicines
	 */
    getAllMedicine: (callback)=>{
        var sql="select * from medicine";
        db.getResults(sql, (results)=>{
			callback(results);
        });
    },

	/**
	 * Adds medicine in database
	 * @function
	 * @memberof module:models/medicine~medicineModel
	 * @inner
	 * @param {object} medicine - Takes medicine object
	 * @param {callback} callback - Returns status
	 */
    insert: (medicine,callback)=>{
        var sql="INSERT INTO `medicine`(`mname`, `mgenre`, `mprice`, `mstatus`) VALUES ('"+medicine.mname+"','"+medicine.mgenre+"','"+medicine.mprice+"','"+medicine.mstatus+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },

	/**
	 * Gets medicine from database
	 * @function
	 * @memberof module:models/medicine~medicineModel
	 * @inner
	 * @param {number} mid - Takes medicine id
	 * @param {callback} callback - Returns medicine
	 */
    getById: function(mid, callback){
		var sql = "select * from medicine where mid= '"+mid+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
    },

	/**
	 * Updates medicine in database
	 * @function
	 * @memberof module:models/medicine~medicineModel
	 * @inner
	 * @param {object} medicine - Takes medicine
	 * @param {callback} callback - Returns status
	 */
    update: function(medicine,callback){
        var sql="UPDATE `medicine` SET `mname`='"+medicine.mname+"',`mgenre`='"+medicine.mgenre+"',`mprice`='"+medicine.mprice+"',`mstatus`='"+medicine.mstatus+"' WHERE mid='"+medicine.mid+"'";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },

	/**
	 * Deletes medicine in database
	 * @function
	 * @memberof module:models/medicine~medicineModel
	 * @inner
	 * @param {number} mid - Takes mid
	 * @param {callback} callback - Returns status
	 */
    delete: function(mid, callback){
		var sql="DELETE FROM medicine WHERE mid='"+mid+"'";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
        });
	},

	/**
	 * Searches medicine from database
	 * @function
	 * @memberof module:models/medicine~medicineModel
	 * @inner
	 * @param {object} search - Takes mSearchFilter and mSearchKey from search object
	 * @param {callback} callback - Returns matched medicines
	 */
	search: function(search, callback){
		var sql="select * from medicine where "+search.mSearchFilter+" like '%"+search.mSearchKey+"%'";
		db.getResults(sql, (results)=>{
			callback(results);
		});

	}

}