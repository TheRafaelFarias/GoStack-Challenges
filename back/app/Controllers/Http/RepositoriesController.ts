import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repository from 'App/Models/Repository'
import RepositoryValidator from 'App/Validators/RepositoryValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class RepositoriesController {
  public async index () {
    const repositories = await Repository.all()
    return repositories
  }
  public async store ({ request }: HttpContextContract) {
    const dto = await request.validate(RepositoryValidator)
    const repository = await Repository.create(dto)

    return repository
  }
  public async show (ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const repository = await Repository.find(id)
      console.log(repository)
      if (!repository) {
        throw new NotFoundException('Repository not found')
      }

      return repository
    } catch (err) {
      throw new NotFoundException('Repository not found')
    }
  }
  public async update ({ request, params }: HttpContextContract) {
    const dto = await request.validate(RepositoryValidator)
    const { id } = params

    try {
      const client = await Repository.find(id)

      client?.merge(dto)
      await client?.save()

      return client
    } catch (err) {
      throw new NotFoundException('Repository not found')
    }
  }
  public async destroy ({ response, params }: HttpContextContract) {
    const { id } = params

    await Repository.find(id)
      .then((repo) => repo?.delete())
      .catch(() => {
        throw new NotFoundException('Repository not found')
      })
    return response.status(204)
  }
}
