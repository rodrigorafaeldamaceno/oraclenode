const express = require('express')
const routes = express.Router()
const apiController = require("../controllers/apiController")

routes.get('/', (req, res) => {
    res.json({ status: "funcionando" })
    console.log("teste")
})

//routes.get("/cnpj",apiController.findCnpj)

routes.get("/cnpj/:id", apiController.findCnpj)
routes.get("/cnpj", apiController.findAll)
routes.get("/cnpjUpdate", apiController.findAndUpdate)

module.exports = routes