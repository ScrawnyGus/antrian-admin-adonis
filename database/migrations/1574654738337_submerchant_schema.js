'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubmerchantSchema extends Schema {
  up() {
    this.create('submerchants', (table) => {
      table.increments()
      table.string('id_merchant')
      table.string('name')
      table.string('description')
      table.string('image')
      table.string('active').defaultTo(0)
      table.string('shift').defaultTo(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('submerchants')
  }
}

module.exports = SubmerchantSchema
