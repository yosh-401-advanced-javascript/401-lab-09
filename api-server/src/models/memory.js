'use strict';

const uuid = require('uuid/v4');

/**
 *
 *
 * @class Model
 */
class Model {

  constructor() {
    this.database = [];
  }

  /**
   *
   *
   * @param {*} id
   * @returns get function
   * @memberof Model
   */
  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /**
   *
   *
   * @param {*} entry
   * @returns the create function
   * @memberof Model
   */
  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   *
   *
   * @param {*} id
   * @param {*} entry
   * @returns the update function
   * @memberof Model
   */
  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  /**
   *
   *
   * @param {*} id
   * @returns the delete function
   * @memberof Model
   */
  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  /**
   *
   *
   * @param {*} entry
   * @returns validation of objects
   * @memberof Model
   */
  sanitize(entry) {

    let valid = true;
    let record = {};
    let schema = this.schema();

    Object.keys(schema).forEach(field => {
      if (schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}
/** 
 *@exports Exports the model class
*/

module.exports = Model;
