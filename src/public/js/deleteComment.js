import axios from 'axios';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded' ,  () =>{
    const DeleteForms = document.querySelectorAll('.eliminar-comentario');

    // Revisar que exista los formularios
    if(DeleteForms.length > 0){
        DeleteForms.forEach(form => {
            form.addEventListener('submit', deleteComment);
        });
    }
});

function deleteComment (e){
    e.preventDefault();

    axios.post(this.action)
    .then(response =>{
        console.log(response);
    });
}