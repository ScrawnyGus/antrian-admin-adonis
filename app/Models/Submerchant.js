'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Submerchant extends Model {
    static get table() {
        return "submerchants";
    }

    static get primaryKey() {
        return "id";
    }

    submerchants() {
        return this.belongsTo('App/Models/Merchant')
    }
}

module.exports = Submerchant
