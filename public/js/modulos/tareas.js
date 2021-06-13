import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from '../funciones/avance'

const tareas = document.querySelector('.listado-pendientes');

if(tareas) {
    tareas.addEventListener('click', evt =>{

        if (evt.target.classList.contains('fa-check-circle')) {
            const icono = evt.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {idTarea})
                .then((respuesta) => {
                    if(respuesta.status === 200){
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                })
        }

        if (evt.target.classList.contains('fa-trash')) {
            const tareaHTML = evt.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;

            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Borrar',
                cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const url = `${location.origin}/tareas/${idTarea}`
                        //Enviar delete por medio de axios
                        axios.delete(url, { params: { idTarea }})
                            .then((respuesta) => {
                                if(respuesta.status === 200){
                                    //Eliminar el nodo
                                    tareaHTML.parentElement.removeChild(tareaHTML);
                                    //Notificamos que fue exitoso
                                    Swal.fire({
                                        icon: 'success',
                                        title: respuesta.data,
                                        showConfirmButton: false,
                                        timer: 3000
                                    });
                                    actualizarAvance();
                                }
                            })
                            .catch(() => {
                                //Notificamos que hubo un error
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Hubo un error',
                                    text: 'No se pudo eliminar la tarea',
                                    showConfirmButton: false,
                                    timer: 3500
                                })
                            });
                    }
                })
        }
    });
}

export default tareas;