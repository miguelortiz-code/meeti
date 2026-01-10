import axios from "axios";

document.addEventListener('DOMContentLoaded',  () =>{
    const form = document.getElementById('confirm_attendance');
    if(form){
        form.addEventListener('submit', confirmAttendance);
    }

    function confirmAttendance(e){
        e.preventDefault();

        axios.post(this.action)
        .then(res => console.log(res.data))
        .catch(err => console.error(err.response.data));
    }
});