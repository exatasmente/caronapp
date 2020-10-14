'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCaronasSchema extends Schema {
  up () {
    this.create('caronas', (table) => {

      table.increments()
      table.integer("viagem_id").unsigned()
      .references('id')
      .inTable('viagens')
      table.string('status')
      table.integer('locacao')

      table.timestamps()
    })
  }

  down () {
    this.drop('caronas')
  }
}

module.exports = CreateCaronasSchema
