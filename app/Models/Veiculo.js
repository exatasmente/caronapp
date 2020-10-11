'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Veiculo extends Model {

    user () {
        return this.belongsTo('App/Models/User')
    }

    async criar(userId,modelo,marca,placa,lugares) {
        this.user_id = userId;
        this.modelo = modelo
        this.marca = marca
        this.placa = placa
        this.lugares =  lugares;
        console.log(this.save())
        await this.save();
    }

}

module.exports = Veiculo
