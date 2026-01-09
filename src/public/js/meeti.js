document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('ubicacion-meeti')) {
    showMap()
  }
});




// Función para mostrar el mapa
function showMap() {
  const latInput = document.getElementById("lat");
  const lngInput = document.getElementById("lng");
  const addressInput = document.getElementById("address");

  const lat = latInput?.value ? parseFloat(latInput.value) : 4.651002988522;
  const lng = lngInput?.value ? parseFloat(lngInput.value) : -74.081282901615;
  const address = addressInput?.value || "";
  let marker;

  const map = L.map("ubicacion-meeti").setView([lat, lng], 18);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  marker = L.marker([lat, lng]).addTo(map)
  .bindPopup(address)
  .openPopup();
}