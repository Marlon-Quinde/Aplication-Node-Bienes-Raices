(function name() {
  const lat = 28.5640969;
  const lng = -81.2038475;
  const mapa = L.map("mapa-inicio").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);
})();
