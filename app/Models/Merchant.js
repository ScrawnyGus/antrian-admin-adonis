"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Merchant extends Model {
  static get table() {
    return "merchants";
  }

  static get primaryKey() {
    return "id";
  }

  submerchants() {
    return this.hasMany('App/Models/Submerchant')
  }
}

module.exports = Merchant;
