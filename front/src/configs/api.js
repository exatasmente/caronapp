export const API_URL = "http://127.0.0.1:3333/api/v1/"

export const ROUTE_SINGUP = "cadastro"

export const ROUTE_CLIENTE = {
    base:"cliente",
    login:"session",
    destino:"cliente/destino",
    viagem:"cliente/viagem",
    carona:"cliente/carona"
};
export const ROUTE_MOTORISTA = {
    base:"motorista",
    login:"session",
    destino:"motorista/destino",
    viagem:"motorista/viagem",
    carona:"motorista/carona",
    veiculo:"motorista/veiculo"
};