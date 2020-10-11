'use strict'

const User = require("../../Models/User")
class MotoristaController {
    async index () {
        return await User.motoristas()
    }
}

module.exports = MotoristaController
