import express from 'express'
import 'dotenv/config'
import mysql from 'mysql2/promise'
import cors from 'cors'
import { router as routes } from './routes.js'

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

const table = `
    CREATE TABLE IF NOT EXISTS capivara (
      id INT NOT NULL AUTO_INCREMENT,
      fotoPerfil LONGBLOB,
      nome VARCHAR(100) NOT NULL,
      idade INT DEFAULT NULL,
      peso INT DEFAULT NULL,
      statusSaude VARCHAR(45) DEFAULT NULL,
      habitat VARCHAR(100) DEFAULT NULL,
      comportamento TEXT,
      dieta TEXT,
      observacao TEXT,
      criadoEm DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )`

const conectiondB = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

conectiondB.connect((error) => {
  if (error) {
    console.error("Erro na conexão.")
  }

  console.log("Banco de dados conectado.")
})

try {
  await conectiondB.query(table)

  console.log("Tabela 'capivara' criada ou já existente.")
} catch (error) {
  console.error("Erro ao criar tabela.")
}

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log("Server online!")
})

export { app, conectiondB }