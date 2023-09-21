export interface PropiedadInterface {
  _csrf: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  precio: string;
  habitaciones: string;
  estacionamiento: string;
  wc: string;
  calle: string;
  lat: string;
  lng: string;
}

export interface DBPropiedad {
  id: string;
  titulo: string;
  descripcion: string;
  habitaciones: number;
  estacionamiento: number;
  wc: number;
  calle: string;
  lat: string;
  lng: string;
  imagen: string;
  publicado: number;
  createdAt: string;
  updatedAt: string;
  precioId: number;
  categoriaId: number;
  usuarioId: number;
}
