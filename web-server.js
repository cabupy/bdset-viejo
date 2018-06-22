/*
  
  Autor: Carlos Vallejos <carlos@vamyal.com>
  Decripcion: API RUC - SET PY

*/

const http = require('http')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./db')

const app = require('express')()

const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 18200

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
  methods: ['HEAD', 'OPTIONS', 'GET'],
  credentials: true,
  maxAge: 3600,
  preflightContinue: false,
}))
// Algunas cuestiones para estar detras de NGINX
app.set('trust proxy', true)
app.set('strict routing', true)
app.set('case sensitive routing', true)
// Agragamos el header powered-by Vamyal S.A. en un middleware
app.set('x-powered-by', false)
app.use( (req, res, next) => {
  res.header('X-Powered-By', 'Vamyal S.A. <vamyal.com>');
  res.header('X-Hello-Human', 'Somos Vamyal, Escribinos a <contacto@vamyal.com>');
  next();
})
// Configurar la ruta de archivos estáticos
app.use(morgan('combined', {
  skip: function (req, res) {
    return req.method != 'GET';
  }
}))

/* esto se puede llevar a routes */
app.get('/ruc/:numero', (req, res) => {

  let sqlCommand = `SELECT * FROM public.contribuyente WHERE ruc = ${req.params.numero}`

  db
    .query(sqlCommand)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: `Ocurrio un error inesperado al consultar el RUC: ${req.params.numero}` })
    })

})

// El resto de metodos y rutas
app.use('*', function (req, res, next) {
  res.status(200).json({
    success: true,
    message: 'Vamyal S.A. 2017 ! -  API para CONSULTAR RUCS - SET PY'
  });
  next();
});

// Arrancamos el Server Express
console.time('Arrancamos el server en');
var server = http.createServer(app).listen(port, ip, function () {
  console.log('API RUC - API en http://%s:%s', server.address().address, server.address().port)
  console.timeEnd('Arrancamos el server en')
})
