import { Request, Response } from "express";

export const admin = (req: Request, res: Response) => {
    res.send('Mis propiedades');
}