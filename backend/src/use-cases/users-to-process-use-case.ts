import path from "path"
import fs from 'fs'

interface UsersToProcessUseCaseRequest {
  names: string[]
}

export class UsersToProcessUseCase {
  async execute({ names }: UsersToProcessUseCaseRequest) {
    const processDirFile = path.join(__dirname, '..', 'process', 'names.json')
    const existsNamesJsonFile = fs.existsSync(processDirFile)

    if (existsNamesJsonFile) {
      fs.readFile(processDirFile, 'utf8', (_, data) => {
        const { names: existingNames } = JSON.parse(data)
        const concatedData = [...existingNames, ...names]

        fs.writeFile(processDirFile, JSON.stringify({ names: concatedData }, null, 2), 'utf8', (error) => {
          if (error) {
            throw new Error('Erro ao salvar arquivo')
          }
        })
      })
    } else {
      fs.writeFile(processDirFile, JSON.stringify({ names }, null, 2), 'utf8', (error) => {
        if (error) {
          throw new Error('Erro ao salvar arquivo')
        }
      })
    }
  }
}