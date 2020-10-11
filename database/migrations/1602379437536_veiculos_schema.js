'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VeiculosSchema extends Schema {
  up () {
    this.create('veiculos', (table) => {
      table.increments()
      table.string("marca")
      table.string("modelo")
      table.string("placa")
      table.integer("lugares")
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('veiculos')
  }
}

module.exports = VeiculosSchema
