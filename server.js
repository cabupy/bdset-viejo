/*
  
  Autor: Carlos Vallejos <carlos@vamyal.com>
  Decripcion: Automatizar descarga de lista de contribuyentes de la SET

*/

const fs = require('fs')
const request = require('request')
const decompress = require('decompress')
const { processFile } = require('./build-sql')

const archivos = [ 'ruc0.zip', 'ruc1.zip', 'ruc2.zip', 'ruc3.zip', 'ruc4.zip', 'ruc5.zip', 'ruc6.zip', 'ruc7.zip', 'ruc8.zip', 'ruc9.zip' ]

let headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
  'Host': 'www.set.gov.py',
  'Origin': 'www.set.gov.py',
}

function downloadFile(archivo) {
  
  let url = `http://www.set.gov.py/rest/contents/download/collaboration/sites/PARAGUAY-SET/documents/informes-periodicos/ruc/${archivo}`
  
  return new Promise((resolve, reject) => {
    
    let pathFile = `files/zip/${archivo}`
    let w = fs.createWriteStream(pathFile)

    let r = request.get({ url, headers })
    
    r.on('response', function (res) {

      console.log('Recibimos un archivo de tipo:', res.headers['content-type'])
    
      res.pipe(w);
    
      w.on('finish', function(){
        //console.log(`${pathFile} ha sido descargado!.`)
        resolve({ success: true, pathFile })
      })

      w.on('error', function(error){
        console.log(`${pathFile}: ERROR WRITE STREAM, ${error}.`)
        reject({ success: false, pathFile })
      })

    })
    
    r.on('error', function (error) {
      console.log(`${pathFile}: ERROR REQUEST GET, ${error}.`)
      reject({ success: false, pathFile })
    })
  
  })

}

/* cargamos en una variable el array de promises */ 
let descargas = archivos.map((archivo, index) => {
  console.time(`${index}: La descarga de ${archivo} duro`)
  return downloadFile(archivo)
    .then(result => { // resolve Promise
      console.timeEnd(`${index}: La descarga de ${archivo} duro`)
      return result
    })
    .catch(error => { //reject Promise
      console.timeEnd(`${index}: La descarga de ${archivo} duro`)
      return result
    })
})

/* Esperamos el resultado de todas las promises cargadas en descargas */ 
Promise.all(descargas)
  .then(estados => {
    
    estados.map(estado => {
      
      if (!estado.success){
        
        console.log(`${estado.pathFile}: tuvo errores de descarga.`)
      
      } else {

        let txtFile = estado.pathFile.split('/')[2].split('.')[0]+'.txt'
        let sqlFile = estado.pathFile.split('/')[2].split('.')[0]+'.sql'
        
        if (fs.existsSync(estado.pathFile)) {
          decompress(estado.pathFile, 'files/txt')
            .then(files => {
              processFile(txtFile, sqlFile)
              console.log(`${estado.pathFile} decompress!.`)
            })
            .catch(err => {
              console.log(`${estado.pathFile}: ERROR DECOMPRESS, ${err}.`)
            })
        } else {
          console.log(`${estado.pathFile}: no encontro el archivo.`)
        }
      
      }

    })

  })

/*archivos.map(archivo => {
  if (fs.existsSync(`files/${archivo}`)) {
    decompress(`files/${archivo}`, 'files')
      .then(files => {
        console.log(`${archivo} decompress.`);
      })
      .catch(err => {
        console.log(err)
      })
  }

})*/

/*Promise.all(descargas)
.then(archivos => {
  setTimeout(function(){
    archivos.map(archivo => {
      if (archivo.success) {
        decompress(archivo.pathFile, 'files')
          .then(files => {
            console.log(`${archivo.pathFile} decompress.`);
          })
          .catch(err => {
            console.log('ERROR: '+err)
          })
      }
    })
  }, 5000)
 
})*/
