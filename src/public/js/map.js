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
})();
