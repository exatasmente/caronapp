'use strict'

const User = use("App/Models/User")

class UsuarioController {
    /**
   * Create a new Veiculo
   */
   async store ({ request }) {
    const data = request.only([ 'username','email','password','role'])
    const user = await User.create(data)
    return user
  }
  async index () {
    return await User.clientes()
  }
  
}

module.exports = UsuarioController
