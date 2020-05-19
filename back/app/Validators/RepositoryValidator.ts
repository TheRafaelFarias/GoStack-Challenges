import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class RepositoryValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    title: schema.string(),
    url: schema.string(),
    techs: schema.array().members(schema.string()),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
