(function name() {
  const lat = 28.5640969;
  const lng = -81.2038475;
  const mapa = L.map("mapa-inicio").setView([lat, lng], 13);

  let markers = new L.FeatureGroup().addTo(mapa);

  let propiedades = []
  //Filtros
  const filtros = {
    categoria: '',
    precio: ''
  }

  const categoriaSelect = document.querySelector('#categorias')
  const precioSelect = document.querySelector('#precios')



  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  // Filtro de Categorias
  categoriaSelect.addEventListener('change', e => {
    filtros.categoria =  +e.target.value
    filtrarPropiedades();
  })


  precioSelect.addEventListener('change', e => {
    filtros.precio =  +e.target.value
    filtrarPropiedades();
  })

  const obtenerPropiedades = async () => {
    try {
      const url = "/api/propiedades";
      const respuesta = await fetch(url);
      propiedades = await respuesta.json();
      mostrarPropiedades(propiedades);
      // console.log(propiedades);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarPropiedades = (propiedades) => {
    // Limpiar los markers previos

    markers.clearLayers();

    propiedades.forEach((propiedad) => {
      // Agregar los pines


      const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
        autoPan: true,
      })
        .addTo(mapa)
        .bindPopup(
          `
          <p class="text-indigo-600 font-bold">${propiedad.categoria.nombre}</p>
          <h1 class="text-xl font-extrabold uppercase my-2">${propiedad?.titulo}</h1>
          <img src="/uploads/${propiedad.imagen}" alt="Imagen de la propidad ${propiedad.titulo}" />
          <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
          <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase">Ver propiedad</a>
          `
        );

      markers.addLayer(marker);
    });
  };

  const filtrarPropiedades = () => {
    const resultado = propiedades.filter(filtarCategoria).filter(filtarPrecio);
    mostrarPropiedades(resultado);
  }

  const filtarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad
  const filtarPrecio = propiedad => filtros.precio ? propiedad.precioId === filtros.precio : propiedad


  obtenerPropiedades();
})();
