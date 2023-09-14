export interface RespuestaObjeto<T> {
  dataValues: T;
  _previousDataValues: T;
  uniqno: number;
  _changed: Set<number>;
  _options: Options;
  isNewRecord: boolean;
}

export interface RespuestaArreglo<T> {
  dataValues: T[];
  _previousDataValues: T[];
  uniqno: number;
  _changed: Set<number>;
  _options: Options;
  isNewRecord: boolean;
}

export interface Options {
  isNewRecord: boolean;
  _schema: null | string;
  _schemaDelimiter: string;
  raw: boolean;
  attributes: string[];
}
