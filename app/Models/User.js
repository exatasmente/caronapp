'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static PAPEL_MOTORISTA = 1;
  static PAPEL_USUARIO = 2;

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  veiculo () {
      return this.hasOne('App/Models/Veiculo', 'id','user_id')
  }
  viagens () {
    return this.hasMany('App/Models/Viagem', 'id','user_id')
  }
  destinos (){
    return this.hasMany('App/Models/Destino', 'id','user_id')
  }

  static scopeClientes (query) {
    return  query.where('role', User.PAPEL_USUARIO)

  }
  static scopeMotoristas (query) {
    return query.where('role', User.PAPEL_MOTORISTA)
  }
  static async clientes () {
    return await User.query().where('role', User.PAPEL_USUARIO).fetch()

  }
  static async motoristas () {
    return await User.query().where('role', User.PAPEL_MOTORISTA).fetch()
  }

  fillValues(data){
    this.username = data.username
    this.first_name = data.first_name
    this.last_name = data.last_name
    this.password = data.password
    this.email = data.email    
  }
 
}
 


module.exports = User
