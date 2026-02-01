import axios from "axios";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
  const DeleteForms = document.querySelectorAll(".eliminar-comentario");

  // Revisar que exista los formularios
  if (DeleteForms.length > 0) {
    DeleteForms.forEach((form) => {
      form.addEventListener("submit", deleteComment);
    });
  }
});

function deleteComment(e) {
  e.preventDefault();

  Swal.fire({
    title: "¿Deseas eliminar este comentario?",
    text: "¡Un comentario eliminado, no se puede recuperar!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Si. Eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Tomar el id del comentario
      const  commentId = this.children[0].value
      // Crear el objeto
      const data = {
        commentId
      }
      // Ejecutar axios y pasar los datos
      axios.post(this.action, data).then((response) => {
        
        Swal.fire({
          title: "¡Eliminado!",
          text: response.data,
          icon: "success",
        });

        // Eliminar comentario del Dom
        this.parentElement.parentElement.remove();
      });
    }
  });
}
