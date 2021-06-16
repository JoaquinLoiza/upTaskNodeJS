const passport = require('passport');

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