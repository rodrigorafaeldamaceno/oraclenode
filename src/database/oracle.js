const oracledb = require('oracledb')
const dbConfig = require('../config/dbConfig')


module.exports = {

  async run() {
    let connection = {}
    try {
      // Get a non-pooled connection
      connection = await oracledb.getConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
      })
      console.log("Success in connecting")

      const sql = 'select substr(lpad(us.cnpj,14,0),0,8) as cnpj from fr_ar_prospects_cisp us order by us.cnpj'
      const result = await connection.execute(
        sql,
        {},
        {
          maxRows: 10
        })

      return result.rows

    } catch (err) {
      console.log("Deu ruim")
      console.error(err)
    }
    finally {
      if (connection) {
        try {
          await connection.close()
          console.log('Connection closed')
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
}




