const fs = require('fs')
const readline = require('readline')
//const escape = require('pg-escape');
//let db = require('./db')

function processFile(inputFile, sqlFile) {

  // Si ya existe el archivo sql previamente, lo borramos
  if (fs.existsSync(`files/sql/${sqlFile}`)) {
    fs.unlink(`files/sql/${sqlFile}`)
  }

  const outstream = new (require('stream'))(),
    instream = fs.createReadStream(`files/txt/${inputFile}`),
    rl = readline.createInterface(instream, outstream)

  let count = 1

  rl.on('line', function (line) {

    let campos = line.split('|')

    let contribuyente = {
      ruc: +campos[0].match(/\d+/g).map(Number),
      nombre: campos[1].replace(/\'/g, "\'\'"),
      dv: +campos[2],
      anterior: campos[3].replace(/\'/g, "\'\'")
    }

    let sqlCommand = `\rINSERT INTO public.contribuyente VALUES ( ${contribuyente.ruc}, '${contribuyente.nombre}', ${contribuyente.dv}, '${contribuyente.anterior}', '${inputFile}' );`

    fs.appendFile(`files/sql/${sqlFile}`, sqlCommand, (err) => {
      if (err) throw err;
      //console.log(sqlCommand)
    })

    /*setTimeout( () => {
      db
      .query(sqlCommand)
      .then(result => console.log(sqlCommand, result) )
      .catch(err => console.log(err))
    },20*count)*/

    count++


  });

  rl.on('close', function (line) {
    console.log(`Lectura del archivo ${inputFile} concluida. Lineas: ${count}`);
  });
}

//processFile('ruc0.txt');

/*fs.readFile('files/txt/ruc0.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
})*/

module.exports = {
  processFile
}


