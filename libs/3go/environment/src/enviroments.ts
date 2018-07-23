/**
 * Classe genérica para armazenamento de configurações
 *
 */
export interface IEnviroments<T> {
  // "key index" property
  [key: string]: T;
}
