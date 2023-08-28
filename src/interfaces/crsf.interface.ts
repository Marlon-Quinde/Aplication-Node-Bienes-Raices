import { Request } from "express";

export interface csrfRequest extends Request {
  csrfToken?: () => string; // Agrega la definición de csrfToken()
}
