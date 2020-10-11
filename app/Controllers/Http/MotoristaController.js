'use strict'

const User = use("App/Models/User")
class MotoristaController {

    async store ({request,response}) {
        let data = request.only([ 'username','email','password'])
        data.role = User.PAPEL_MOTORISTA;
        const user = await User.create(data)
        return response.status(201).send(user);
    }
    async index ({auth}) {
        return await auth.getUser()
    }

}

module.exports = MotoristaController
