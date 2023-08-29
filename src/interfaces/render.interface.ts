export interface PropertiesRender {
    pagina: string,
    csrfToken?: string,
    errores?: Record<string, unknown>[]
    usuario?: Record<string, string>
}