/**
 * Generic class for store environments
 *
 */
export interface IEnviroments<T> {
  // "key index" property
  [key: string]: T;
}
