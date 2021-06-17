const usuarios = require('../models/usuarios');
const enviarEmail = require('../handlers/email');

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
        //crear una URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
        //crear el objeto de usuario
        const usuario = {
            email
        }
        //enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
        // Redirigir al usuario
        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta!');
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

exports.formRestablecerPassword = (req, res) => {
    res.render(`reestablecer`, {
        nombrePagina: 'Reestablecer tu contraseña'
    })
};

//Cambia el estado de una cuenta
exports.confirmarCuenta = async (req, res) => {
    const usuario = await usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });
    // Si no existe el ususario
    if(!usuario){
        req.flash('error', 'No valido');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta activada');
    res.redirect('/iniciar-sesion');
};