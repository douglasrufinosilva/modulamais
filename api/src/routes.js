import express from 'express'
import { conectiondB } from './server.js'
const router = express.Router()

router.get("/", async (req, res) => {

  try {
    const [dados] = await conectiondB.query('SELECT * FROM capivara')
    const { habitat } = req.query

    if(dados.length == 0){
      return res.status(404).json({
        message: "Nenhum registro encontrado."
      })
    }
  
    if(habitat) {
      const filtro = dados.filter(item => item.habitat.split(' ').join('').toLowerCase() === habitat.toLowerCase())
      res.status(200).json(filtro)
  
    } else {
        res.status(200).json(dados)
    }
    
  } catch (error) {
    console.error("Erro ao  buscar dados.")
    return res.status(500).json({
      message: "Erro ao buscar dados"
    })
  }
})

router.post("/", (req, res) => {
  const {
    id,
    nome = null,
    idade = null,
    peso = null,
    statusSaude = null,
    habitat = null,
    comportamento = null,
    dieta = null,
    observacoes = null
  } = req.body;

  const newRegister = {
    id,
    nome,
    idade,
    peso,
    statusSaude,
    habitat,
    comportamento,
    dieta,
    observacoes
  }

  dadosParaTeste.push(newRegister)

  res.status(201).json({
    message: "Registro criado."
  })
})

router.put("/:id", (req, res) => {
  const { id } = req.params

  const register = dadosParaTeste.find(item => item.id === id)

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

router.delete("/:id", (req, res) => {
  const { id } = req.params
  const updatedRegisters = dadosParaTeste.filter(item => item.id != id)

  if(updatedRegisters.length === dadosParaTeste.length){
    return res.status(404).json({
      message: "Registro não encontrado."
    })
  }

  dadosParaTeste.length = 0
  dadosParaTeste.push(...updatedRegisters)

  res.status(200).json({
    message: "Registro deletado."
  })
})

export { router }