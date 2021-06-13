const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo donde vamos a autenticar
const usuarios = require('../models/usuarios');

// Local strategy - Login con credenciales propias (usuario y password)
passport.use(
    new LocalStrategy(
        // default espera usuario y password
        {
            //Rescribimos para que sea email y password
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) => {
            try {
                const usuario = await usuarios.findOne({
                    where: { email: email }
                })
                // El usuario existe pero el password es incorrecto
                if (!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'password incorrecto'
                    });
                }
                // Usuario y password correctos
                return done(null, usuario);
            } catch (error) {
                // El usuario no existe
                return done(null, false, {
                    message: 'El usuario no existe'
                });
            }
        } 
    )
);

// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

//Exportar
module.exports = passport;