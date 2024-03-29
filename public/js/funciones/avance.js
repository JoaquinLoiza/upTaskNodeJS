import Swal from "sweetalert2";

export const actualizarAvance = () => {
    //seleccionar las tareas existentes
    const tareas = document.querySelectorAll('li.tarea');

    if (tareas.length){
        
        // seleccionar las tareas completas
        const tareasCompletas = document.querySelectorAll('i.completo');
        
        //calcular avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);
        
        //mostrar el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%';

        if(avance === 100){
            Swal.fire({
                icon: 'success',
                title: '¡Felicidades!',
                text: 'Completaste el proyecto',
                showConfirmButton: true,
            });
        }
    }
}