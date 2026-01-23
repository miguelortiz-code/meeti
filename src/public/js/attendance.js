import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("confirm_attendance");

  if (!form) return;

  form.addEventListener("submit", confirmAttendance);

  function confirmAttendance(e) {
    e.preventDefault();

    const btn = document.getElementById('attendance');
    let inputAction =  document.getElementById('inputAction').value;

    const data = {
      inputAction
    }

    axios
      .post(this.action, data)
      .then((response) => {
        if(inputAction === 'confirm'){
          // Modificar los elementos del botón
          document.getElementById('inputAction').value = 'cancel'
          btn.value = 'Cancelar Asistencia';
          btn.classList.remove('btn-azul');
          btn.classList.add('btn-rojo');
        } else{
          document.getElementById('inputAction').value = 'confirm'
          btn.value = 'Confirmar Asistencia';
          btn.classList.remove('btn-rojo');
          btn.classList.add('btn-azul');
        }
      })
  }
});