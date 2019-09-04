const express = require('express')
const routes = express.Router()
const apiController = require("../controllers/apiController")

routes.get('/', (req, res) => {
    res.json({ status: "funcionando" })
})

//routes.get("/cnpj",apiController.findCnpj)

routes.get("/cnpj/:id", apiController.findCnpj)

module.exports = routes