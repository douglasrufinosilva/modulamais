import express from 'express'

const router = express.Router()

const dadosParaTeste = [
  {
    id: "1",
    nome: "Senhorita Bigode",
    idade: 4,
    peso: 65,
    statusSaude: "Saudável",
    habitat: "Lago Sul",
    comportamento: "Muito ativa, gosta de nadar no lado durante a manhã.",
    dieta: "Prefere pasto fresco e frutas, especialmente maçãs.",
    observacoes: "Costuma socializar com Diógenes, muitas vezes são vistos juntos."
  },
  {
    id: "2",
    nome: "Helena",
    idade: 3,
    peso: 58,
    statusSaude: "Saudável",
    habitat: "Floresta Oeste",
    comportamento: "Não socializa bem com outras capivaras, frequentemente vista descansando á sombra.",
    dieta: "Consome uma variedade de vegetação, incluindo folhas e capim.",
    observacoes: null
  }
]

router.get("/", (req, res) => {
  res.status(200).json(dadosParaTeste)
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