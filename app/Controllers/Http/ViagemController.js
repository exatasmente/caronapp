'use strict'

const Viagem = use("App/Models/Viagem")
const Destino = use("App/Models/Destino")
const User = use("App/Models/User")
const Event = use("Event")


class ViagemController {


    async index({ auth }) {
        let user = await auth.getUser();
        return await user.viagens().with("destino").fetch()

    }

    validate(data) {
        return data.date
            && data.pessoas
            && data.destino.line_1
            && data.destino.line_2
            && data.destino.city
            && data.destino.state
            && data.destino.zipcode;
    }
    async update({ request, response, auth }) {

        let data = request.only(['modelo', 'fabricante', 'placa', 'lugares', 'ano'])
        let user = await auth.getUser();
        let veiculo = await user.veiculo().fetch();
        if (!veiculo) {
            return response.status(404).send({ message: 'not found' })
        }
        if (user.role === User.PAPEL_USUARIO) {
            return response.status(403).send({ message: 'Invalid User role' })
        }
        if (!this.validate(data)) {
            return response.status(400).send({ message: 'Invalid Data' })
        }
        data.lugares = parseInt(data.lugares)
        data.user_id = user.id;
        veiculo.fillValues(data)
        await veiculo.save();
        return response.status(200).send(veiculo)
    }

    async destroy({ request, response, auth, params }) {
        let user = await auth.getUser();
        const viagem = await user.viagens().where("id", params.id).first()
        if (viagem != null) {
            return response.status(204).send(await viagem.delete())
        } else {
            return response.status(404).send({ message: "Viagem não encontrada!" })
        }

    }

    async store({ request, response, auth }) {
        let data = request.only(['date', 'pessoas', 'line_1', 'line_2', 'city', 'state', 'zipcode'])
        const user = await auth.getUser();
        let viagem = new Viagem()
        let destino = new Destino()
        destino.fillValues(data)
        await user.destinos().save(destino)
        viagem.fillValues(data)
        viagem.user_id = user.id
        await destino.save()
        viagem.destino_id = destino.id
        await viagem.save()

        Event.fire('new::viagem',viagem,user,destino)
        

        return response.send(viagem)

    }

    async show({ request, response, auth, params }) {
        const user = await auth.getUser()
        const id = params.id
        const viagem = await user.viagens().where("id", params.id).with("destino").first()
        if (viagem != null) {
            return response.status(200).send(viagem)
        }
    }

}

module.exports = ViagemController
