'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Veiculo extends Model {

    user () {
        return this.belongsTo('App/Models/User')
    }

    fillValues(data){
       this.modelo = data.modelo
       this.marca = data.marca
       this.placa = data.placa
       this.lugares = data.lugares
    }

}

module.exports = Veiculo
