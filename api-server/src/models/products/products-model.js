'use strict';

const Model = require('../mongo.js');
const schema = require('./products-schema.js');

/**
 *
 *
 * @class Products
 * @extends {Model}
 */
class Products extends Model {
  constructor() { super(schema); }
}


/**
 * 
 * @exports exports the Products model
 */
module.exports = Products;
