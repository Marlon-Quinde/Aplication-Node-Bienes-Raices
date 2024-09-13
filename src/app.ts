class Contenedor<T> {
  private datos: T[];

  constructor() {
    this.datos = [];
  }

  agregar(dato: T) {
    this.datos.push(dato);
  }

  obtener(): T[] {
    return this.datos;
  }
}

const contenedorNumeros = new Contenedor<number>();
contenedorNumeros.agregar(1);
contenedorNumeros.agregar(2);
const numeros = contenedorNumeros.obtener(); // numeros es un arreglo de números

interface Valor<T, K> {
  array: K[] | Array<K>;
  valor: T;
}
