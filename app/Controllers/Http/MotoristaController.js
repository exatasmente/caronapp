'use strict'

const User = use("App/Models/User")
class MotoristaController {
    async index () {
        return await User.motoristas()
    }
}

module.exports = MotoristaController
