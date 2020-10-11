'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ({ request, response }) => {
    return 'Ola';
})

Route.get('cliente', 'ClienteController.index')

Route.group('motorista',() =>{
    Route.get('/', 'MotoristaController.index')
    Route.get('/veiculo', 'VeiculoController.index')
    Route.post('/veiculo', 'VeiculoController.store')
    Route.put('/veiculo', 'VeiculoController.update')
    Route.delete('/veiculo', 'VeiculoController.delete')

}).middleware(['auth','motorista']).prefix('motorista')

Route.post('cadastro/cliente', 'ClienteController.store')
Route.post('cadastro/motorista', 'MotoristaController.store')
Route.post('/session', 'SessionController.create')