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
      table.integer('lotacao')
      table.integer('vagas')
      table.integer('user_id').unsigned()
        .references('id')
        .inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('caronas')
  }
}

module.exports = CreateCaronasSchema
