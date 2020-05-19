import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Repositories extends BaseSchema {
  protected tableName = 'repositories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable().unique()
      table.string('url').notNullable()
      table.specificType('techs', 'text[]')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
