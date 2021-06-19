const express = require('express');
const routes = require('./routes');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//importar variables
require('dotenv').config({path: 'variables.env'});

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

// Donde cargar archivos estaticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

//Habilitar bodyparser (deprecado ahora se utiliza express.urlencoded)
app.use(express.urlencoded({extended: true}));

//añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Agregar flash messages
app.use(flash());

app.use(cookieParser());

//Sesiones. permiten navegar entre distintas paginas sin volver a auntenticar
app.use(session({ 
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null;
    next();
});

app.use('/', routes());

//Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor está funcionando');
});