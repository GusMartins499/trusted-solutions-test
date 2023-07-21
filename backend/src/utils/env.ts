import 'dotenv/config'

export const env = {
  GITHUB_API: process.env.GITHUB_API,
  GITHUB_API_INTERVAL: Number(process.env.GITHUB_API_INTERVAL)
}