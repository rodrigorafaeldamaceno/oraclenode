const auth = require("../config/auth.json")
const axios = require("axios")

const config = {
  headers: auth
}

// 77595395
module.exports = {
  async findCnpj(req, res) {
    console.log(req.params.id)
    const response = await axios.get(
      `https://servicos.cisp.com.br/v1/avaliacao-analitica/raiz/${req.params.id}`,
      config
    )
    //console.log(response.data)
    return res.json(response.data)
  }
}