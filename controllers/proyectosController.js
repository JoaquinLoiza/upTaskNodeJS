const Proyectos = require('../models/proyectos');
const tareas = require('../models/tareas');

exports.proyectosHome = async(req, res) => {

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

    res.render("index" , {
        nombrePagina : 'Up Task',
        proyectos
    });
};

exports.formularioProyecto = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

    res.render("nuevoProyecto" , {
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    });
};

exports.nuevoProyecto = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    //validacion del input
    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
    }

    //si exiten errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            proyectos,
            errores
        });
    }else {
        const usuarioId = res.locals.usuario.id;
        await Proyectos.create({ nombre, usuarioId })
        res.redirect('/');
    }
};

exports.proyectoPorUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }});
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // Consultar las tareas del proyecto actual
    const tareasProyectos = await tareas.findAll({where: { proyectoId: proyecto.id }});

    if(!proyecto) return next();

    res.render('tareas', {
        nombrePagina : 'Tareas del proyecto',
        proyectos,
        proyecto,
        tareasProyectos
    })
};

exports.formularioEditar = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }});
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //render a la vista
    res.render('nuevoProyecto', {
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    })
};

exports.actualizarProyecto = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    //validacion del input
    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
    }

    //si exiten errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina : 'Editar Proyecto',
            proyectos,
            errores
        });
    }else {
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id }}
        );
        res.redirect('/');
    }
};

exports.eliminarProyecto = async(req, res, next) => {
    //req contiene la informacion, se puede utilizar query o params
    //console.log(req.params);
    //console.log(req.query);
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto }});
    if(!resultado){
        return next();
    }
    res.status(200).send('Proyecto eliminado correctamente');
};