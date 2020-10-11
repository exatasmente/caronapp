'use strict'

const User = use("App/Models/User")

class ClienteController {
    /**
   * Create a new Veiculo
   */
   async store ({ request,response }) {
    let data = request.only([ 'username','email','password'])
    data.role = User.PAPEL_USUARIO;
    const user = await User.create(data)

    return response.status(201).send(user);
  }
  async index ({auth}) {
    return await  auth.getUser();
  }
  
}

module.exports = ClienteController
