import Propiedad from "./Propiedad";
import Precio from "./Precio";
import Categoria from "./Categoria";
import Usuario from "./Usuario";


Precio.hasOne(Propiedad);
Usuario.hasOne(Categoria);

// Propiedad.belongsTo(Precio);


export {
    Precio,
    Propiedad,
    Categoria,
    Usuario
}