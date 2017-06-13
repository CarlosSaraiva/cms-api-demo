'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Post Schema
 */

const PostSchema = new Schema({
  title: { type : String, default : '', trim : true },
  body: { type : String, default : '', trim : true },  
  createdAt  : { type : Date, default : Date.now },
});

/**
 * Statics
 */

PostSchema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @api private
   */

  findById: function (_id) {
    return this.findOne({ _id })
      // .populate('user', 'name email username')
      .exec();
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @api private
   */

  findAll: function ({ criteria = {} } = {}) {

    return this.find(criteria)
      // .populate('user', 'name username')
      .sort({ createdAt: -1 })
      .exec();
  }
};

module.exports = mongoose.model('Article', PostSchema);