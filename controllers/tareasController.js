const proyectos = require('../models/proyectos');
const tareas = require('../models/tareas');

exports.agregarTarea = async (req, res, next) => {
    //Obtenemos el proyecto actual
    const proyecto = await proyectos.findOne({ where: {url: req.params.url}});

    // Traer el valor del input
    const {tarea} = req.body;
    
    //estado incompleto
    const estado = 0;
    
    //Id del proyecto
    const proyectoId = proyecto.id;

    //Insertar en la base de datos
    const resultado = await tareas.create({ tarea, estado, proyectoId});
    if(!resultado){
        return next();
    }
    //Redireccionamiento
    res.redirect(`/proyectos/${req.params.url}`);
};

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await tareas.findOne({ where: {id: id}});

    let estado = 0;

    if (tarea.estado === estado){
        estado = 1;
    }

    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Se cambió el estado');
}

exports.eliminarTarea = async (req, res, next) => {
    const { id } = req.params;

    //Eliminar tarea
    const resultado = await tareas.destroy({ where: { id : id }});

    if (!resultado) return next();

    res.status(200).send('Tarea eliminada');
}