'use strict'

const User = use("App/Models/User")
class SessionController {
    async create ({ request, auth, response }) {
        const { username, password } = request.all()
        let token = await auth.attempt(username, password)
        const user = await User.query().where('username',username).first()
        token.role = user.role
        return response.status(201).send(token);
    }

}

module.exports = SessionController
