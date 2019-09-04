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

      const sql = 'select cnpj from fr_ar_prospects_cisp order by cnpj'
      const result = await connection.execute(
        // The statement to execute
        sql,
        {},
        {
          maxRows: 10
        })
      //console.log(result.metaData) // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]

      //console.log(result.rows)
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
  /*,
  async queryCNPJ() {
    const sql = 'select cnpj from fr_ar_prospects_cisp order by cnpj'
    const result = await connection.execute(
      // The statement to execute
      sql,
      {},
      {
        maxRows: 10
      })
    //console.log(result.metaData) // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]

    // console.log(result.rows)
    return result.rows
  }*/
}




