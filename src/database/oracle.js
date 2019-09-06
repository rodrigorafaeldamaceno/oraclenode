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

      // TODO: Refactory this method
      const sql = `select substr(lpad(us.cnpj,14,0),0,8) as cnpj from fr_ar_prospects_cisp us where SYNC_CISP is null order by us.cnpj`
      const result = await connection.execute(
        sql,
        {},
        {
          maxRows: 1
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
  },
  async update(result, cnpj) {

    console.log(cnpj)
    //console.log(cnpj.toString())

    let connection = {}
    const sqlTest = `UPDATE FR_TESTE_NODEJS SET SYNC = 'S', CISP = :resul tWHERE substr(lpad(cnpj,14,0),0,8) = :cnpj`
    const sql = `UPDATE fr_ar_prospects_cisp 
                  SET SYNC_CISP = 'S', CISP_AVALIACAO = :result 
                  WHERE substr(lpad(cnpj,14,0),0,8) = :cnpj
                  `
    try {
      // Get a non-pooled connection
      connection = await oracledb.getConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
      })
      console.log("Success in connecting")

      let response = await connection.execute(
        sql,
        [result, cnpj],
        { autoCommit: true });  // commit once for all DML in the script

      console.log("Rows updated: " + response.rowsAffected); // 2

      // console.log(JSON.stringify(result))

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





