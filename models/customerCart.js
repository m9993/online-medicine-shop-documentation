/** Provides customer cart management
 * @module models/customerCart
 */

/**
 * Model to mount customer cart management related functions on.
 * @type {object}
 * @const
 * @namespace customerModel
 */

const { Result } = require("express-validator");

// cart
module.exports= {
    /**
     * Adds an item to cart.
     * @function
     * @memberof module:models/customerCart~customerModel
     * @inner
     * @param {object} newItem - New item
     * @param {object} oldCart - Old cart
     * @param {callback} results - Updated cart
     */
    add: (item, oldCart, results)=>{
      
        if(oldCart.length==0){
            var a={storedId: item.mid, storedName:item.mname, storedQty: 1, storedPrice: item.mprice };
            oldCart.push(a);
            results(oldCart);
            return;
        }
        if(oldCart.length!=0){
            var exists=false;
            for (var i = 0; i < oldCart.length; i++) {
                if(oldCart[i].storedId == item.mid){
                    exists=true;
                }                
            }

            if(!exists){
                var a={storedId: item.mid, storedName:item.mname, storedQty: 1, storedPrice: item.mprice };
                oldCart.push(a);
                results(oldCart);
                return;
            }else{
                for(var i=0; i<oldCart.length; i++){ 
                    if(oldCart[i].storedId==item.mid){
                        oldCart[i].storedQty++;
                        oldCart[i].storedPrice+=item.mprice;
                    }
                }
                results(oldCart);
                return;
            }

        }
        

    },

    /**
     * Reduces single quantity of an item from cart.
     * @function
     * @memberof module:models/customerCart~customerModel
     * @inner
     * @param {object} item - Item to reduce quantity
     * @param {object} oldCart - Old cart
     * @param {callback} results - Updated cart
     */
    reduceByOne:(item, oldCart, results)=>{
        for(var i=0; i<oldCart.length; i++){ 
            if(oldCart[i].storedId==item.mid){
                if(oldCart[i].storedQty != 0){
                    oldCart[i].storedQty--;
                    oldCart[i].storedPrice-=item.mprice;
                }
            }
        }
        results(oldCart);
        return;
    },

    /**
     * Increases single quantity of an item from cart.
     * @function
     * @memberof module:models/customerCart~customerModel
     * @inner
     * @param {object} item - Item to increase quantity
     * @param {object} oldCart - Old cart
     * @param {callback} results - Updated cart
     */
    addByOne:(item, oldCart, results)=>{
        for(var i=0; i<oldCart.length; i++){ 
            if(oldCart[i].storedId==item.mid){
                oldCart[i].storedQty++;
                oldCart[i].storedPrice+=item.mprice;
            }
        }
        results(oldCart);
        return;
    },
}


// cart