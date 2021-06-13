import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //enviar peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                axios.delete(url, {params: {urlProyecto}})
                    .then(function(res){
                        console.log(res);
                        Swal.fire({
                            icon: 'success',
                            title: res.data,
                            showConfirmButton: false,
                            timer: 3000
                        });
                        //redireccionar al inicio
                        setTimeout(() =>{
                            window.location.href = '/'
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        //redireccionar al inicio
                        setTimeout(() =>{
                            window.location.href = '/'
                        }, 3000);
                    });
            }
          })
    })
}
export default btnEliminar;