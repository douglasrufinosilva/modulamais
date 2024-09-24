import express from 'express'
import 'dotenv/config'
import { router as routes } from './routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log("Server online!")
})

export { app }