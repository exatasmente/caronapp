'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitacoesSchema extends Schema {
  up () {
    this.create('solicitacoes', (table) => {
      table.increments()
      table.integer('viagem_id')
        .references('id')
        .inTable('viagens')
      table.integer('carona_id')
        .references('id')
        .inTable('caronas')
      table.integer('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('solicitacoes')
  }
}

module.exports = SolicitacoesSchema
