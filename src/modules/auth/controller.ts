import {Request, Response} from "express";
import AuthService from "./service";

const authService = new AuthService;
export const authController = (req: Request, res: Response) => {
    res.json({
        msg: 'Exito' + ' ' + authService.validarSuma(1, 2)
    });
};