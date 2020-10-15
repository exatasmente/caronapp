'use strict'
const User = use("App/Models/User")
const Viagem = use("App/Models/Viagem")
const Veiculo = use("App/Models/Veiculo")
const Destino = use("App/Models/Destino")
const Event = use("Event")



class AuthController {
    async store ({request, response}){
        const userData = request.only([ "usuario","role"])
        let usuario = new User()
        usuario.first_name = userData.usuario.first_name
        usuario.last_name = userData.usuario.last_name
        usuario.email = userData.usuario.email
        usuario.username = userData.usuario.username
        usuario.password = userData.usuario.password
        
        let veiculo = null;
        if(userData.role == User.PAPEL_MOTORISTA){
            usuario.role = User.PAPEL_MOTORISTA
            
            await usuario.save()
            const veiculoData = request.only("veiculo")
            veiculo = new Veiculo()
            veiculo.user_id = usuario.id
            console.log(veiculoData)
            veiculo.fabricante = veiculoData.veiculo.fabricante
            veiculo.modelo = veiculoData.veiculo.modelo
            veiculo.ano = veiculoData.veiculo.ano
            veiculo.placa = veiculoData.veiculo.placa
            veiculo.lugares = veiculoData.veiculo.lugares
            await veiculo.save()

    
        }else{
            usuario.role = User.PAPEL_CLIENTE
            await usuario.save()
        }
        
        let viagemData = request.only(["viagem", "destino"])
       
        let destino = new Destino()
        destino.user_id = usuario.id
        destino.fillValues(viagemData.destino)
        await destino.save()
        
        let viagem = new Viagem()
        viagem.user_id = usuario.id
        viagemData.viagem.date = new Date(viagemData.viagem.date)
        viagemData.viagem.pessoas = parseInt(viagemData.viagem.pessoas)
        viagem.destino_id = destino.id
        viagem.fillValues(viagemData.viagem)
        await viagem.save()
        await viagem.load("destino")     
        
       let responseData = { "user" : usuario, "viagem" : viagem}
       if(veiculo != null){
        responseData.veiculo = veiculo
       }
       try{
        Event.fire('new::viagem', viagem,usuario,destino)
       }catch(e){
        return response.status(201).send(e)
       }
       
       return response.status(201).send(responseData)
    }
 

    ///index: Exibir um registro;
    async index({request, response, auth}){
        let user = await auth.getUser()
        user.password = null;
        return response.status(200).send(user)
    }

    //update: Alterar um registro;
    async update({request,response,auth}){
        let user = auth.getUser();
        const userData = request.only(['usuario'])
        user.fill(userData.usuario);
        await user.save();
        return response.status(200).send(user);
    }

    
    //destroy: Remover um registro;
    async delete ({ request, auth, response }) {
        const userData = await auth.getUser()   
        console.log(auth.getUser())   
        await userData.delete()
        return        
    }
 
}

module.exports = AuthController
