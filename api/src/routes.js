import express from 'express'

const router = express.Router()

router.get("/", (req, res) => {
  res.send("get ok")
})

router.post("/", (req, res) => {
  res.send("post ok")
})

router.put("/", (req, res) => {
  res.send("put ok")
})

router.delete("/", (req, res) => {
  res.send("delete ok")
})
export { router }