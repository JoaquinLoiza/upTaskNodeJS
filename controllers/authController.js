const passport = require('passport');
const Usuarios = require('../models/usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs')

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

    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    // enviarlos a la BD
    await usuario.save();

    // url reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
};

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
        }
    });

    //si no encuentra el usuario
    if(!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }

    //Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer contraseña'
    })
};

exports.actualizarPassword = async (req, res) => {

    //Verifica token y fecha de expiracion
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });

    //Verifica si el usuario existe
    if(!usuario){
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }

    //hashear el password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    //Guardamos el nuevo password
    await usuario.save();
    req.flash('correcto', 'Tu password se ha modificado con exito');
    res.redirect('/iniciar-sesion');
};