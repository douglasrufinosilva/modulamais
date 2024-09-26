import express from 'express'
import { conectiondB } from './server.js'
const router = express.Router()

router.get("/", async (req, res) => {

  try {
    const [dataDb] = await conectiondB.execute('SELECT * FROM capivara')
    const { habitat } = req.query

    if (dataDb.length == 0) {
      return res.status(404).json({
        message: "Nenhum registro encontrado."
      })
    }

    if (habitat) {
      const filtro = dataDb.filter(item => item.habitat.split(' ').join('').toLowerCase() === habitat.toLowerCase())
      res.status(200).json(filtro)

    } else {
      res.status(200).json(dataDb)
    }

  } catch (error) {
    console.error("Erro ao  buscar dados.")

    return res.status(500).json({
      message: "Erro ao buscar dados"
    })
  }
})

router.post("/", async (req, res) => {

  try {
    const {
      nome = null,
      idade = null,
      peso = null,
      statusSaude = null,
      habitat = null,
      comportamento = null,
      dieta = null,
      observacao = null
    } = req.body;

    const [result] = await conectiondB.execute(
      "INSERT INTO capivara (nome, idade, peso, statusSaude, habitat, comportamento, dieta, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nome, idade, peso, statusSaude, habitat, comportamento, dieta, observacao]
    )

    res.status(201).json({
      message: "Registro criado."
    })

  } catch (error) {
    console.error("Erro ao criar Registro.")

    return res.status(500).json({
      message: "Erro ao criar registro."
    })
  }
})

router.put("/:id", (req, res) => {
  const { id } = req.params

  const register = dataDb.find(item => item.id === id)

  if (!register) {
    return res.status(404).json({
      message: "Registro não encontrado."
    })
  }

  Object.assign(register, req.body)

  res.status(200).json({
    message: "Dados atualizados."
  })
})

router.delete("/:id", async (req, res) => {

  try {
    const { id } = req.params
    const [result] = await conectiondB.execute("DELETE FROM capivara WHERE id = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Registro não encontrado."
      })
    }

    res.status(200).json({
      message: "Registro deletado."
    })

  } catch (error) {
    console.error("Erro ao deletar Registro.")

    return res.status(500).json({
      message: "Erro ao deletar registro."
    })
  }
})

export { router }