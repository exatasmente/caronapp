'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const PAPEL_MOTORISTA = 1;
const  PAPEL_USUARIO = 2;
class User extends Model {
  

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
    if(this.papel == PAPEL_MOTORISTA){
      return this.hasOne('App/Models/Veiculo')
    }
  }
  viagens () {
    return this.hasMany('App/Models/Viagem')
  }

  static scopeClientes (query) {
    return  query.where('role', PAPEL_USUARIO)

  }
  static scopeMotoristas (query) {
    return query.where('role', PAPEL_MOTORISTA)
  }
  static async clientes () {
    return await User.query().where('role', PAPEL_USUARIO).fetch()

  }
  static async motoristas () {
    return await User.query().where('role', PAPEL_MOTORISTA).fetch()
  }
}
 


module.exports = User
