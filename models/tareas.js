const Sequelize = require('sequelize');
const db = require('../config/db');
const proyectos = require('./proyectos');

const tareas = db.define('tareas', {
    id : {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});

// Cada vez que se cree una tarea, está pertenece a un proyecto
// Es la relacion mediante la llave fk
// a su vez tiene una restriccion de borrado en cascada
tareas.belongsTo(proyectos, { onDelete: 'cascade' });

module.exports = tareas;