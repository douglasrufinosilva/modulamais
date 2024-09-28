import express from 'express'
import { conectiondB } from './server.js'
import multer from 'multer'

const upload = multer({
  storage: multer.memoryStorage()
})
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

    const data = dataDb.map(item => {
      return {
        ...item,
        fotoPerfil: item.fotoPerfil ? `data:image/jpg;base64,${item.fotoPerfil.toString('base64')}` : null
      }
    })

    if (habitat) {
      const filtro = data.filter(item => item.habitat.split(' ').join('').toLowerCase() === habitat.toLowerCase())
      res.status(200).json(filtro)

    } else {
      res.status(200).json(data)
    }

  } catch (error) {
    console.error("Erro ao buscar dados.")

    return res.status(500).json({
      message: "Erro ao buscar dados."
    })
  }
})


router.get("/detalhes/:id", async (req, res) => {

  try {

    const { id } = req.params

    const [dataDb] = await conectiondB.execute("SELECT * FROM capivara WHERE id = ?;", [id])

    res.status(200).json(dataDb)

  } catch (error) {
    console.error("Erro ao buscar dados desse registro.")

    return res.status(500).json({
      message: "Erro ao buscar dados desse registro."
    })
  }

})


router.get("/galeria/:id", async (req, res) => {

  try {
    const { id } = req.params
    const [dataDb] = await conectiondB.execute("SELECT * FROM galeriacapivara WHERE capivara_id = ?;", [id])

    if (dataDb.length == 0) {
      return res.status(404).json({
        message: "Nenhuma imagem encontrada."
      })
    }

    res.status(200).json(dataDb)

  } catch (error) {
    console.error("Erro ao carregar imagens.")

    return res.status(500).json({
      message: "Erro ao carregar imagens."
    })
  }
})


router.post("/", upload.single('fotoPerfil'), async (req, res) => {

  try {

    const fotoPerfil = req.file ? req.file.buffer : null

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
      "INSERT INTO capivara (fotoPerfil, nome, idade, peso, statusSaude, habitat, comportamento, dieta, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [fotoPerfil, nome, idade, peso, statusSaude, habitat, comportamento, dieta, observacao]
    )

    res.status(201).json({
      message: "Registro criado."
    })

  } catch (error) {
    console.error("Erro ao criar Registro.")

    return res.status(404).json({
      message: "Erro ao criar registro."
    })
  }
})


router.post("/galeria/:id", upload.single('imagemGaleria'), async (req, res) => {

  try {

    const { id } = req.params
    const imagemGaleria = req.file ? req.file.buffer : null

    const [result] = await conectiondB.execute("INSERT INTO galeriacapivara (capivara_id, foto) VALUES (?, ?);", [id, imagemGaleria])

    res.status(201).json({
      message: "Imagem adicionada a galeria."

    })
  } catch (error) {
    console.error("Erro ao adicionar imagem.")

    return res.status(500).json({
      message: "Erro ao adicionar imagem."
    })
  }
})


router.put("/:id", async (req, res) => {

  try {

    const { peso, statusSaude, comportamento, dieta, observacao } = req.body
    const { id } = req.params
    const [result] = await conectiondB.execute(
      "UPDATE capivara SET peso = COALESCE(?, peso), statusSaude = COALESCE(?, statusSaude), comportamento = COALESCE(?, comportamento), dieta = COALESCE(?, dieta), observacao = COALESCE(?, observacao) WHERE id = ?",
      [peso, statusSaude, comportamento, dieta, observacao, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Registro não encontrado."
      })
    }

    res.status(200).json({
      message: "Dados atualizados."
    })

  } catch (error) {
    console.error("Erro ao atualizar Registro.")

    return res.status(404).json({
      message: "Erro ao atualizar registro."
    })
  }
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