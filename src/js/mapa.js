(function () {
    const lat = -2.0318417;
    const lng = -79.9146073;
    const mapa = L.map("mapa").setView([lat, lng], 13);
  
    let marker;
  
    //Utilizar provider y geocode
  
    const geoService = L.esri.Geocoding.geocodeService();
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapa);
  
    //EL PIN
    marker = new L.marker([lat, lng], {
      draggable: true,
      autoPan: true,
    }).addTo(mapa);
  
    //Detectar el movimento del ping
  
    marker.on("moveend", function (event) {
      marker = event.target;
  
      const posicion = marker.getLatLng();
  
      mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));
  
      //Obtener la infomacion de las calles
      geoService
        .reverse()
        .latlng(posicion, 13)
        .run(function (error, resultado) {
          //console.log(resultado);
  
          marker.bindPopup(resultado.address.LongLabel);

          //Llenar los campos
          document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
          document.querySelector('#calle').value = resultado?.address?.Address ?? '';
          document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';
          document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
        });
    });
  })();
  