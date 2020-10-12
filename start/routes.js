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
const Helpers = use('Helpers');
Route.group(() => {
    Route.get('/', 'ApiController.getCities');
    Route.get('/cliente', 'ClienteController.index')

    Route.get('/', 'MotoristaController.index')
        .middleware(['auth','motorista'])
        .prefix('motorista')
    Route.get('/veiculo', 'VeiculoController.index')
        .middleware(['auth','motorista'])
        .prefix('motorista')
    Route.post('/veiculo', 'VeiculoController.store')
        .middleware(['auth','motorista'])
        .prefix('motorista')
    Route.put('/veiculo', 'VeiculoController.update')
        .middleware(['auth','motorista'])
        .prefix('motorista')
    Route.delete('/veiculo', 'VeiculoController.delete')
        .middleware(['auth','motorista'])
        .prefix('motorista')



    Route.post('/cadastro', 'AuthController.store')
    Route.post('/session', 'SessionController.create')

}).prefix('api/v1');


Route.any('*', ({ response }) => {
    response.download(Helpers.publicPath('react/app.html'));
});