(function () {
  const lat = document.getElementById("lat").value || 4.651002988522;
  const lng = document.getElementById("lng").value || -74.081282901615;
  const map = L.map("mapa").setView([lat, lng], 12);
  let marker;
  const geocodeService = L.esri.Geocoding.geocodeService(); // Utilizar provider y Geocoder

  document.addEventListener("DOMContentLoaded", () => {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // Pin o marker
    marker = new L.marker([lat, lng], {
      draggable: true,
      autoPan: true,
    }).addTo(map);

    // Detectar el movimiento del marker
    marker.on("moveend", function (e) {
      marker = e.target;
      const position = marker.getLatLng();
      map.panTo(new L.LatLng(position.lat, position.lng));

      // Obtener la información de la calles al soltar el pin
      geocodeService
        .reverse()
        .latlng(position, 13)
        .run(function (error, result) {
          if (error) {
            console.log(error);
          }
          completeInputs(result);
          marker.bindPopup(result.address.LongLabel);
        });
    });
  });
})();

function completeInputs(result){
  document.getElementById('country').value = result.address.CntryName || '';
  document.getElementById('city').value = result.address.City || '' ;
  document.getElementById('zip_code').value = result.address.Postal || '' ;
  document.getElementById('address').value = result.address.Address || '' ;
  document.getElementById('neighborhood').value = result.address.Neighborhood || '';
  document.getElementById('lat').value = result.latlng.lat || '';
  document.getElementById('lng').value = result.latlng.lng || '';
}