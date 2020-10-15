'use strict'
const Destino = use("App/Models/Destino")
const User = use("App/Models/User")
const Carona = use("App/Models/Carona")
const ViagemModel = use("App/Models/Viagem")
const Database = use("Database")

const Viagem = exports = module.exports = {}

Viagem.handle = async (viagem, user, destino) => {

    if (user.role == User.PAPEL_MOTORISTA) {
        const veiculo = await user.veiculo().fetch()
        let carona = new Carona()
        carona.user_id = user.id

        carona.viagem_id = viagem.id
        
        viagem.status = ViagemModel.STATUS_MOTORISTA
        carona.lotacao = (veiculo.lugares - 1) - viagem.pessoas
        carona.vagas = carona.lotacao
        try {
            await viagem.save()
            viagem.carona_id = carona.id
            await carona.save()
        } catch (error) {
            console.log(error)
        }


    } else {
        const caronas = await Carona.query()
            .innerJoin('users', function () {
                this
                    .on('caronas.user_id', 'users.id')
            })
            .innerJoin('viagens', function () {
                this
                    .on('viagens.destino_id', 'destinos.id')
            })
            .innerJoin('destinos', function () {
                this
                    .on('destinos.id', 'viagens.destino_id')
            })
            
            .where('destinos.city', destino.city)
            .where('destinos.state', destino.state)
            .where('destinos.zipcode','like', '%'+destino.zipcode+'%')
            .where('caronas.vagas', '>=', viagem.pessoas )
            .where('viagens.status',ViagemModel.STATUS_MOTORISTA)
            .with('viagem')
            .with('passageiros')
            .fetch()
            
            caronas.rows.forEach(async carona => {
                await carona.solicitacoes().create({
                    carona_id : carona.id,
                    viagem_id : viagem.id,
                    status : ViagemModel.STATUS_PENDENTE
                    
                })
            });


    }

}

