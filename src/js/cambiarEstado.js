(function () {
  const cambiarEstadoBotones = document.querySelectorAll(".cambiar-estado");
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  cambiarEstadoBotones.forEach((botton) => {
    botton.addEventListener("click", cambiarEstadoPropiedad);
  });

  async function cambiarEstadoPropiedad(e) {
    const { propiedadId: id } = e.target.dataset;

    try {
      const url = `/propiedades/${id}`;
      const respuesta = await fetch(url, {
        method: "PUT",
        headers: { "CSRF-TOKEN": token },
      });

      const resultado = await respuesta.json();

      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }
})();
