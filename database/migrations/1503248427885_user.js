'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => { /// username, email, password, role, first_name, last_name
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('role').default(2)//cliente
      table.string('first_name')
      table.string('last_name')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
