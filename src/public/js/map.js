(function () {
  const latInput = document.getElementById("lat");
  const lngInput = document.getElementById("lng");
  const addressInput = document.getElementById("address");

  const lat = latInput?.value ? parseFloat(latInput.value) : 4.651002988522;
  const lng = lngInput?.value ? parseFloat(lngInput.value) : -74.081282901615;
  const address = addressInput?.value || "";

  const map = L.map("mapa").setView([lat, lng], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const geocodeService = L.esri.Geocoding.geocodeService();

  // Un solo contenedor de markers
  const markers = L.featureGroup().addTo(map);

  let marker;

  // Función reutilizable para crear/actualizar el marker
  const createMarker = (lat, lng) => {
    markers.clearLayers();

    marker = L.marker([lat, lng], {
      draggable: true,
      autoPan: true,
    }).addTo(map);

    marker.bindPopup(address).openPopup();
    markers.addLayer(marker);

    // Detectar movimiento
    marker.on("moveend", function (e) {
      marker = e.target; 
      const position = marker.getLatLng();
      map.panTo(new L.LatLng(position.lat, position.lng));

      geocodeService
        .reverse()
        .latlng(position, 13)
        .run(function (error, result) {
          if (error) return console.error(error);

          completeInputs(result);
          marker.bindPopup(result.address.LongLabel);
        });
    });
  };

  // Crear marker inicial (edición o nuevo)
  createMarker(lat, lng, address);
})();

function completeInputs(result) {
  document.getElementById("country").value = result.address.CntryName || "";
  document.getElementById("city").value = result.address.City || "";
  document.getElementById("zip_code").value = result.address.Postal || "";
  document.getElementById("address").value = result.address.Address || "";
  document.getElementById("neighborhood").value =
    result.address.Neighborhood || "";
  document.getElementById("lat").value = result.latlng.lat || "";
  document.getElementById("lng").value = result.latlng.lng || "";
}
