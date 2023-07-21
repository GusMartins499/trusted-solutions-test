import path from 'path'
import fs from 'fs'

function moveProcessFileToProcessedDir(fileProcessed: string) {
  const processedDirPath = path.join(__dirname, '..', '..', 'processed')
  const fileName = path.basename(fileProcessed)
  const currentDate = new Date().getTime()

  const processedFileName = `${currentDate}_${fileName}`
  const processedFileDirPath = path.join(processedDirPath, processedFileName)

  fs.rename(fileProcessed, processedFileDirPath, (error) => {
    if (error) {
      throw new Error('Erro ao mover arquivo')
    }
  })
}

function writeFileDataJsonFile(dataFromGithubAPI: GithubProfileUser[], fileProcessed: string) {
  const pathDataJson = path.join(__dirname, '..', '..', '..', 'db.json')
  const existsDataJsonFile = fs.existsSync(pathDataJson)

  if (existsDataJsonFile) {
    fs.readFile(pathDataJson, 'utf8', (_, data) => {
      const { users } = JSON.parse(data)
      const concatedData = [...users, ...dataFromGithubAPI]
      const usersUpdated = { users: concatedData }
      fs.writeFile(pathDataJson, JSON.stringify(usersUpdated, null, 2), 'utf8', (error) => {
        if (error) {
          throw new Error('Erro ao salvar arquivo')
        }
      })
    })
  } else {
    fs.writeFile(pathDataJson, JSON.stringify(dataFromGithubAPI, null, 2), 'utf8', (error) => {
      if (error) {
        throw new Error('Erro ao salvar arquivo')
      }
    })
  }

  moveProcessFileToProcessedDir(fileProcessed)
}

export async function getDataFromGithubAPI() {
  const dataFromGithubAPI: GithubProfileUser[] = []
  const fileToProcess = path.join(__dirname, '..', '..', 'process', 'names.json')

  fs.readFile(fileToProcess, 'utf8', async (error, data) => {
    if (error) {
      throw new Error('Sem arquivos para processar')
    }

    const { names } = JSON.parse(data)

    try {
      for (const name of names) {
        const response = await fetch(`https://api.github.com/users/${name}`)
        const responseJSON = await response.json()

        if (responseJSON.message === 'Not Found') {
          throw new Error(`Usuário: ${name} não encontrado`)
        }

        dataFromGithubAPI.push(responseJSON)
      }
    } catch (error) {
      console.error(error);
    }
    writeFileDataJsonFile(dataFromGithubAPI, fileToProcess)
  })
}