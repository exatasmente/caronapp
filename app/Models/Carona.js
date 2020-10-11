'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Carona extends Model {
    
    viagemMotorista () {
        return this.hasOne('App/Models/Viagem')
    }
    passageiros () {
        return this.hasMany('App/Models/Viagem')
    }
    
    
}

module.exports = Carona


