//let shell = require("shelljs");
const express = require("express");
const path = require('path');
const morgan = require('morgan');
const Request = require("request");
const admin = require("firebase-admin");
const usuarios = require("./model/usuarios");

//conectar y configurar la conexion a firebase
var serviceAccount = require("./conexiondemo-f29c7-firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://conexiondemo-f29c7.firebaseio.com"
});
const bdfirebase = admin.database();

const app = express();
app.set('port', process.env.PORT || 4000);

//-- middlewares de la cabecera
app.use((req, res, next) => {

  // Dominio que tengan acceso (ej. 'http://example.com')
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Metodos de solicitud que deseas permitir
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var refUsuarios = bdfirebase.ref("usuarios");

refUsuarios.on("child_added", function (snapshot) {
  var result = snapshot.val();
  const id = snapshot.key;
  const nombre = result.nombre;
  const apellido = result.apellido;
  const edad = result.edad;
  const data = { id, nombre, apellido, edad }
  console.log(data);
  usuarios.Insert(data);
});

refUsuarios.on("child_changed", function (snapshot) {
  var result = snapshot.val();
  const id = snapshot.key;
  const nombre = result.nombre;
  const apellido = result.apellido;
  const edad = result.edad;
  const data = { nombre, apellido, edad }
  console.log(data);
  usuarios.Update(data, id);
});

refUsuarios.on("child_removed", function (snapshot) {
  console.log(snapshot.key);
  usuarios.Delete(snapshot.key);
});

// Rutas de la aplicación(app)
//importar las rutas principales 
app.use(require('./routes/usuarios'));

//----Configurar directorio Public para la app
//app.use(express.static(path.join(__dirname, 'src/public')));
//---- Iniciar el servidor
app.listen(app.get('port'), () => {
  //mandar mensaje de donde esta corriendo la app
  console.log("localhost levantado en :", app.get('port'));
});
