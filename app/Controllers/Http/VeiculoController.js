'use strict'

const User = use("App/Models/User")
const Veiculo = use("App/Models/Veiculo")

class VeiculoController {
    async index ({auth}) {
        let user = await auth.getUser();
        return await user.veiculo().fetch()
    }
   validate (data) {
        return data.fabricante && data.modelo && data.placa && data.lugares && data.ano;
   }
   async update ({request,response,auth}) {
       try{

           let data = request.only([ 'modelo', 'fabricante','placa','lugares','ano'])
           let user = await auth.getUser();
           let veiculo = await user.veiculo().fetch();
           if(!veiculo){
               return response.status(404).send({message : 'not found'})
           }
           if(user.role === User.PAPEL_USUARIO){
               return response.status(403).send({message : 'Invalid User role'})
           }
           if(!this.validate(data)){
               return response.status(400).send({message : 'Invalid Data'})
           }
           data.lugares = parseInt(data.lugares)
           data.user_id = user.id;
           veiculo.fillValues(data)
           await veiculo.save();
           return response.status(200).send(veiculo)
       }catch(e){
           if(e.code == 'E_MISSING_DATABASE_ROW'){
               return response.status(422).send({'messsage' : 'Motorista não encontrado'})
           }
           return response.status(500)
       }
   }
   async delete ({request,response,auth}) {
       try{
           let user = await auth.getUser();
           if(user.role === User.PAPEL_USUARIO){
               return response.status(403).send({message : 'Invalid User role'})
           }
           let veiculo = await user.veiculo().fetch();

           return response.send(await veiculo.delete())
       }catch(e){
           if(e.code == 'E_MISSING_DATABASE_ROW'){
               return response.status(422).send({'messsage' : 'Motorista não encontrado'})
           }
           return response.status(500)
       }
   }
   async store ({ request, response,auth}) {

    try{
        let data = request.only([ 'modelo', 'fabricante','placa','lugares', 'ano'])
        let user = await auth.getUser();
        if(user.role === User.PAPEL_USUARIO){
            return response.status(403).send({message : 'Invalid User role'})
        }
        if(!this.validate(data)){
            return response.status(400).send({message : 'Invalid Data'})
        }

        data.lugares = parseInt(data.lugares)
        data.user_id = user.id;
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
