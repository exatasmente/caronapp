'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateDestinosSchema extends Schema {
  up () {
    this.create('destinos', (table) => {
      table.increments()
      table.string('line_1')
      table.string('line_2')
      table.string('city')
      table.string('state')
      table.string('zipcode')
      table.integer('user_id').unsigned()
      .references('id')
      .inTable('users')


      table.timestamps()
    })
  }

  down () {
    this.drop('destinos')
  }
}

module.exports = CreateDestinosSchema
