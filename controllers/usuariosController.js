const usuarios = require('../models/usuarios');

exports.formCrearUsuario = async (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en Up Task',
    })
};

exports.formIniciarSesion = async (req, res) => {
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion',
        error: error
    })
};

exports.crearCuenta = async (req, res) => {
    //Leer los datos del input
    const { email, password } = req.body;

    try {
        //crear Usuario
        await usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion');
    } catch (e) {
        req.flash( 'error', e.errors.map(error => error.message) );
        res.render( 'crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta en Up Task',
            email,
            password
        })
    }
};