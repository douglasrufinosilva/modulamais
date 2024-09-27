import express from 'express'
import 'dotenv/config'
import mysql from 'mysql2/promise'
import { router as routes } from './routes.js'

const app = express()
const PORT = process.env.PORT || 3000

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

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log("Server online!")
})

export { app, conectiondB }