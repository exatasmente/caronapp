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
      table.bigInteger('user_id')
        .references('id')
        .inTable('users'
        )
      table.timestamps()
    })
  }

  down () {
    this.drop('veiculos')
  }
}

module.exports = VeiculosSchema
