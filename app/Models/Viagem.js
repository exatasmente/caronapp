'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Viagem extends Model {

    static STATUS_PENDENTE = 1
    static STATUS_ACEITA = 2
    static STATUS_RECUSADO = 3
    static STATUS_EXPIRADO = 4
    static STATUS_MOTORISTA = 5
    static get table () {
        return 'viagens'
      }

    solicitacoes(){
        return this.hasMany("App/Models/Solicitacao",'id','viagem_id')
    }  
    destino () {
        return this.hasOne('App/Models/Destino', 'destino_id', 'id')//tem um
    }
    usuario () {
        return this.belongsTo('App/Models/User', 'id', 'user_id')//pertence a
    }
    carona () {
        return this.belongsTo('App/Models/Carona', 'carona_id', 'id')
    }

    fillValues(data){

        this.date = new Date(data.date)
        this.pessoas =  !isNaN(parseInt(data.pessoas)) ? parseInt(data.pessoas) : 0
    }
}

module.exports = Viagem
