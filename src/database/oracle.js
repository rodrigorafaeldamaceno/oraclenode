const oracledb = require('oracledb')
const dbConfig = require('../config/dbConfig')

let connection = {}
const run = async () => {

  try {
    // Get a non-pooled connection
    connection = await oracledb.getConnection({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
    })
    console.log("Success in connecting")

    await queryCNPJ()

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

const queryCNPJ = async () => {
  const sql = 'select cnpj, razao_social from fr_ar_prospects_cisp order by cnpj'
  const result = await connection.execute(
    // The statement to execute
    sql,
    {},
    {
      //maxRows: 10
    })
  //console.log(result.metaData) // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
  const rows = result.rows
  console.log(rows)     // [ [ 180, 'Construction' ] ]
}

run()



