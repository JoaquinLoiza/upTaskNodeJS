const Sequelize = require('sequelize');
const db = require('../config/db');
const proyectos = require('../models/proyectos');
const bcrypt = require('bcrypt-nodejs');

const usuarios = db.define('usuarios', 
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        //Checkea que sea un email valido mediante Sequelize 
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido'
            },
            notEmpty: {
                msg: 'El email no puede estar vacio'
            }
        },
        //Valida que exista un solo usuario con ese email
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede estar vacio'
            },
            min: {
                args: 8,
                msg: 'Debe contener al menos 8 caracteres',
            }
        }
    }
},
{
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

usuarios.hasMany(proyectos);

module.exports = usuarios;