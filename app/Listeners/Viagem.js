'use strict'

const User = use("App/Models/User")
const Carona = use("App/Models/Carona")
const ViagemModel = use("App/Models/Viagem")


const Viagem = exports = module.exports = {}

Viagem.handle = async (viagem, user, destino) => {

    if (user.role == User.PAPEL_MOTORISTA) {
        const veiculo = await user.veiculo().fetch()
        viagem.status = ViagemModel.STATUS_MOTORISTA
        const carona = await Carona.create({
            viagem_id : viagem.id,
            lotacao : (veiculo.lugares) - viagem.pessoas,
            vagas   : (veiculo.lugares - 1) - viagem.pessoas,
            user_id : user.id,
        })
        viagem.carona_id = carona.id
        await viagem.save()



    } else {
        const caronas = await Carona.query()
            .innerJoin('users', function () {
                this.on('caronas.user_id', 'users.id')
            })
            .innerJoin('viagens', function () {
                this.on('viagens.destino_id', 'destinos.id')
            })
            .innerJoin('destinos', function () {
                this.on('destinos.id', 'viagens.destino_id')
            })
            .where('destinos.city', destino.city)
            .where('destinos.state', destino.state)
            .where('destinos.zipcode','like', '%'+destino.zipcode+'%')
            .where('caronas.vagas', '>=', viagem.pessoas )
            .where('viagens.status',ViagemModel.STATUS_MOTORISTA)
            .with('viagem')
            .with('passageiros')
            .fetch()

            for (const carona of caronas.rows) {
                const count =  await viagem.solicitacoes().where('carona_id',carona.id).getCount()
                if(count  == 0) {
                    await viagem.solicitacoes().create({
                        carona_id: carona.id,
                        viagem_id: viagem.id,
                        status: ViagemModel.STATUS_PENDENTE
                    });
                }
            }


    }

}

