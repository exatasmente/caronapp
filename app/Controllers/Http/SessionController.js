'use strict'

class SessionController {
    async create ({ request, auth, response }) {
        const { username, password } = request.all()
        let token = await auth.attempt(username, password)
        return response.status(201).send(token);
    }

}

module.exports = SessionController
