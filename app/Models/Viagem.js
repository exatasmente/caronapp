'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Viagem extends Model {

    static STATUS_PENDENTE = 1
    static STATUS_ACEITA = 2
    static STATUS_RECUSA = 3
    static STATUS_EXPIRADO = 4

    static get table () {
        return 'viagens'
      }
    destino () {
        return this.hasOne('App/Models/Destino')//tem um
    }
    user () {
        return this.belongsTo('App/Models/User')//pertence a
    }
    carona () {
        return this.belongsTo('App/Models/Carona')
    }
}

module.exports = Viagem
