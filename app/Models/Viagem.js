'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Viagem extends Model {

    STATUS_PENDENTE = 1
    STATUS_ACEITA = 2
    STATUS_RECUSA = 3
    STATUS_EXPIRADO = 4
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
