const express = require('express');
const router = express.Router();

// Importamos Express-Validator
const { body } = require('express-validator');

// importamos los controladores
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function(){
    // ruta para el home
    router.get('/', proyectosController.proyectosHome);
    // rutas para nuevo proyecto
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);
    
    //Listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    // Actualizar el proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto);

    //Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    //Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea);

    //Actualizar Tareas
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    //Eliminar tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    //Crear usuario
    router.get('/crear-cuenta', usuariosController.formCrearUsuario);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //Iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    return router;
};
