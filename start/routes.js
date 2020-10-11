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

Route.on('/').render('welcome')
Route.get('/test', ({ request, response, view }) => {
    return 'Ola';

  })
Route.get('motorista', 'MotoristaController.index')
Route.get('veiculo/', 'VeiculoController.index')
Route.get('veiculo/criar', 'VeiculoController.store')


Route.get('user/criar', 'UsuarioController.store')
Route.get('cliente', 'UsuarioController.index')