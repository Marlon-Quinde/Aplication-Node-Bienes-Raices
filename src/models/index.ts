import Propiedad from "./Propiedad";
import Precio from "./Precio";
import Categoria from "./Categoria";
import Usuario from "./Usuario";


// Precio.hasOne(Propiedad);
// Usuario.hasOne(Categoria);

Propiedad.belongsTo(Precio, {foreignKey: 'precioId'});
Propiedad.belongsTo(Categoria, {foreignKey: 'categoriaId'});
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'});


export {
    Precio,
    Propiedad,
    Categoria,
    Usuario
}