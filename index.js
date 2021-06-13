const express = require('express');
const routes = require('./routes');
const path = require('path');
const flash = require('connect-flash');

//Crear la conexión a la BBDD
const db = require('./config/db');

//helpers con algunas funciones
const helpers = require('./helpers');

//Importar el modelo
require('./models/proyectos');
require('./models/tareas');
require('./models/usuarios');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(err => console.log(err));

//crear una app de express
const app= express();

//Habilitar bodyparser (deprecado ahora se utiliza express.urlencoded)
app.use(express.urlencoded({extended: true}));

// Donde cargar archivos estaticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

//añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Agregar flash messages
app.use(flash());

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

app.use('/', routes());

//Asignar puerto
app.listen(3000);