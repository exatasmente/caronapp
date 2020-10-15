'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Carona extends Model {
    static get table () {
        return 'caronas'
    }
    
    viagem () {
        return this.hasOne('App/Models/Viagem','viagem_id','id')
    }
    passageiros () {
        return this.hasMany('App/Models/Viagem', 'viagem_id','id')
    }  
    solicitacoes(){
        return this.hasMany("App/Models/Solicitacao")
    }  
    
    
}

module.exports = Carona


