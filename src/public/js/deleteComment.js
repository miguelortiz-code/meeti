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
      axios.post(this.action).then((response) => {
        console.log(response);
      });

      Swal.fire({
        title: "¡Eliminado!",
        text: "El comentario ya no está disponible.",
        icon: "success",
      });
    }
  });
}
