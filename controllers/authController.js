const passport = require('passport');
const Usuarios = require('../models/usuarios')

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Existen campos vacios'
})

//Funcion para checkear si el usuario se encuentra logueado
exports.usuarioAutenticado = (req, res, next) => {

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy( ()=> {
        res.redirect('/iniciar-sesion');
    })
}

exports.enviarToken = async (req, res) => {
    //verificar que el usuario existe
    const usuario =await Usuarios.findOne({where: {email: req.body.email}})

    if(!usuario) {
        req.flash('error', 'El email ingresado no tiene una cuenta registrada');
        res.render(`reestablecer`, {
            nombrePagina: 'Reestablecer tu contraseña',
            mensajes: req.flash(),
        })
    }
};