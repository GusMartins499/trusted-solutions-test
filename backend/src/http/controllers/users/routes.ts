import { FastifyInstance } from 'fastify'
import { UsersToProcess } from './users-to-process'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users/process', UsersToProcess)
}