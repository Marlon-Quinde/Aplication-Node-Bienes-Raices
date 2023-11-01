import Propiedad from "./Propiedad";
import Precio from "./Precio";
import Categoria from "./Categoria";
import Usuario from "./Usuario";
import Mensaje from "./mensaje";

// Precio.hasOne(Propiedad);
// Usuario.hasOne(Categoria);

Propiedad.belongsTo(Precio, { foreignKey: "precioId" });
Propiedad.belongsTo(Categoria, { foreignKey: "categoriaId" });
Propiedad.belongsTo(Usuario, { foreignKey: "usuarioId" });
Propiedad.hasMany(Mensaje, { foreignKey: "propiedadId" });

Mensaje.belongsTo(Propiedad, { foreignKey: "propiedadId" });
Mensaje.belongsTo(Usuario, { foreignKey: "usuarioId" });

export { Precio, Propiedad, Categoria, Usuario, Mensaje };
