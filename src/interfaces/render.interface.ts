export interface PropertiesRender {
  pagina: string;
  csrfToken?: string;
  mensaje?: string;
  errores?: Record<string, unknown>[];
  usuario?: Record<string, string>;
  error?: boolean;
  barra?: boolean;
}
