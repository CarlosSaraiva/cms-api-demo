/**
 * Dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Post Schema
 */

const PostSchema = new Schema({
  title: { type : String, default : '', trim : true },
  body: { type : String, default : '', trim : true },  
  createdAt  : { type : Date, default : Date.now }
});

/**
 * Statics
 */

PostSchema.statics = {
  /**
   * List all the blog posts
   *
   * @param {Object} options
   * @api private
   */

  findAll: function ({ criteria = {} } = {}) {

    return this.find(criteria)
      .sort({ createdAt: -1 })
      .exec();
  }
};

module.exports = mongoose.model('Article', PostSchema);