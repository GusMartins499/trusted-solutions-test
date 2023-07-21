import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { getDataFromGithubAPI } from "./services/schedules/get-data-from-github-api";
import { env } from "./utils/env";
import { usersRoutes } from "./http/controllers/users/routes";

const app = fastify()

setInterval(() => {
  getDataFromGithubAPI()
}, env.GITHUB_API_INTERVAL)

app.register(fastifyCors, {
  origin: true
})
app.register(usersRoutes)

export { app }