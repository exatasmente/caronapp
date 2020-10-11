'use strict'

const User = use("App/Models/User")
const Veiculo = use("App/Models/Veiculo")

class VeiculoController {
 /**
   * Return all Veiculos
   */
   async index () {
    return Veiculo.all()
  }

  /**
   * Create a new Veiculo
   */
   async store ({ request, response}) {
    let data = request.only([ 'modelo', 'marca','placa','lugares','user_id'])
    
    data.lugares = parseInt(data.lugares)
    try{
        let user = await User.query().motoristas().where('id',data.user_id).firstOrFail()
        const veiculo = await Veiculo.create(data);    
        return response.send(veiculo)
    }catch(e){
        if(e.code == 'E_MISSING_DATABASE_ROW'){
            return response.status(422).send({'messsage' : 'Motorista não encontrado'})
        }
        return response.status(500)
    }
  }
}

module.exports = VeiculoController
