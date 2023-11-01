export const esVendedor = (usuarioId: string, propiedadUsuarioId: string) => {
  return usuarioId === propiedadUsuarioId;
};

export const formatearFecha = (fecha: object) => {
  const nuevaFecha = new Date(fecha as any).toISOString().slice(0, 10);

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(nuevaFecha).toLocaleDateString("es-ES", opciones);
};
