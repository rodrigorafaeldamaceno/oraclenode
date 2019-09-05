const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const oracle = require('./database/oracle')
const app = express()

app.use(routes)
app.use(express.json())

// const run = async () => {
//   let rows = await oracle.run()
//   rows.forEach(element => {
//     console.log(element)
//   })
// }

//run()
app.listen(3000)




