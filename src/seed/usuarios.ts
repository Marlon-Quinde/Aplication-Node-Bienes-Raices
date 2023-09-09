import { hashSync } from "bcrypt";
const usuarios = [
  {
    nombre: "Marlon Quinde",
    email: "marlon.quin.cor@outlook.es",
    confirmado: 1,
    password: hashSync("emelec", 10),
  },
];
export default usuarios;
