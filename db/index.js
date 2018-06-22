/*
  
  Autor: Carlos Vallejos <carlos@vamyal.com>
  Decripcion: acceso nativo a la bd y ejecucion de query

*/

let pg = require('pg-native')
let configPG = 'postgresql://postgres:postgres@localhost:5434/meditechdb_dev'

module.exports = {

  query: (sqlCommand) => {

    return new Promise((resolve, reject) => {

      let pgLink = new pg()
      pgLink.connect(configPG, (err) => {

        if (err) return reject(err)

        pgLink.query(sqlCommand, (err, result) => {

          if (err) return reject(err)
          resolve(result)
          pgLink.end()

        })

      })

    })

  }

}