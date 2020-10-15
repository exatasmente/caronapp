'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Destino extends Model {
    static get table () {
        return 'destinos'
    }
    
    usuario () {
        return this.belongsTo('App/Models/User','id','user_id')
    }
    viagem() {
        return this.belongsTo('App/Models/Viagem','id','destino_id')
    }

    fillValues(data){

        this.line_1 = data.line_1
        this.line_2 = data.line_2
        this.city = data.city
        this.state = data.state
        this.zipcode = data.zipcode 
        
    }
}

module.exports = Destino
