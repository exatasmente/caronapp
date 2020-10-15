'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Solicitacao extends Model {
    static get table(){
        return "solicitacoes";
    }
    
    viagem(){
        return this.hasOne("App/Models/Viagem",'viagem_id','id')
    }

    carona(){
        return this.hasOne("App/Models/Carona")
    }
}

module.exports = Solicitacao
