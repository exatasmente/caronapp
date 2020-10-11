'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Destino extends Model {
    usuario () {
        return this.belongsTo('App/Models/User')
    }
    viagens () {
        return this.belongsToMany('App/Models/Viagem')
    }
}

module.exports = Destino
