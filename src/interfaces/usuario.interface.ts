export interface UsuarioInterface {
  id: number;
  nombre: string;
  email: string;
  password: string;
  token: string;
  confirmado: boolean;
  createdAt: Date;
  updatedAt: Date;
}
