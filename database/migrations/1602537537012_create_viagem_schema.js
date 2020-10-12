'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateViagemSchema extends Schema {
  up () {
    this.create('viagens', (table) => {
      table.increments()
      
      table.integer('user_id')
        .references('id')
        .inTable('users')
      table.integer('destino_id')
        .references('id')
        .inTable('destinos')
        table.dateTime('date')
        table.integer('pessoas').default(0)
      table.integer('carona_id').unsigned().nullable()


      table.timestamps()
    })
  }

  down () {
    this.drop('viagens')
  }
}

module.exports = CreateViagemSchema
