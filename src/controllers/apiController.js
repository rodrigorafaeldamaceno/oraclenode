const auth = require("../config/auth.json")
const axios = require("axios")
const oracle = require('../database/oracle')
const delay = require('delay')

const config = {
  headers: auth
}

// 77595395
module.exports = {
  async findCnpj(req, res) {
    //console.log(req.params.id)
    const response = await axios.get(
      `https://servicos.cisp.com.br/v1/avaliacao-analitica/raiz/${req.params.id}`,
      config
    )
    // console.log("a")
    //console.log(response.data)
    return res.json(response.data)
  },
  async findAll(req, res) {
    const list = []
    const rows = await oracle.run()
    //console.log(rows.length)

    for (let i = 0; i < rows.length; i++) {
      const response = await axios.get(
        `https://servicos.cisp.com.br/v1/avaliacao-analitica/raiz/${rows[i]}`,
        config
      )
      list.push(response.data)
      console.log(i)
      await delay(333)
    }
    console.log("Request complete")
    return res.send(list)

  }
}


