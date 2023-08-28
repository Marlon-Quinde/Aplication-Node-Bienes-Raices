import { UserRepository } from './repository';
export default class AuthService {
    private readonly userRepository: UserRepository;

    constructor () {
        this.userRepository = new UserRepository();
    }

    validarSuma(numero1: number, numero2: number){
        return numero1.toString() + numero2.toString();
    }


    async existeUsuario (email: string) {
         return await this.userRepository.existeUsuario(email)
    }
}