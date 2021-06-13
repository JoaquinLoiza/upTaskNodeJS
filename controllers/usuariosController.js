const usuarios = require('../models/usuarios');

exports.formCrearUsuario = async (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en Up Task',
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
        res.render('crearCuenta', {
            //enviamos los errores a la vista
            errores: e.errors,
            nombrePagina: 'Crear cuenta en Up Task'
        })
    }
};