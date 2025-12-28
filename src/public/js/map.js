(function () {
  const lat = document.getElementById("lat").value || 4.651002988522;
  const lng = document.getElementById("lng").value || -74.081282901615;
  const map = L.map("mapa").setView([lat, lng], 12);
  let marker;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Pin o marker
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true
  })
  .addTo(map)

  // Detectar el movimiento del marker
  marker.on('moveend', function(e){
    marker = e.target;
    const  position =  marker.getLatLng();
    map.panTo(new L.LatLng(position.lat, position.lng));
  })
})();
