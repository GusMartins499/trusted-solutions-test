import { FastifyReply, FastifyRequest } from "fastify";
import { UsersToProcessUseCase } from "src/use-cases/users-to-process-use-case";
import { z } from "zod"

export function UsersToProcess(request: FastifyRequest, reply: FastifyReply) {
  const usersToProcessSchema = z.object({
    names: z.array(z.string())
  })

  const { names } = usersToProcessSchema.parse(request.body)

  try {
    const usersToProcessUseCase = new UsersToProcessUseCase()

    usersToProcessUseCase.execute({ names })

    return reply.send()

  } catch (error) {
    throw new Error()
  }
}