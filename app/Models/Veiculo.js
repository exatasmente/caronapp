'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Veiculo extends Model {

    user () {
        return this.belongsTo('App/Models/User')
    }

    fillValues(data){
       this.modelo = data.modelo
       this.fabricante = data.fabricante
       this.placa = data.placa
       this.lugares = !isNaN(parseInt(data.lugares)) ? parseInt(data.lugares) : 5
       this.ano = data.ano
    }
    

}

module.exports = Veiculo
