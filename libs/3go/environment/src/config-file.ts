/**
 * Config file object
 *
 * @export
 */
export class ConfigFile {
  /**
   * File name
   *
   * @memberof ConfigFile
   */
  public name: string;

  /**
   * Environment url association
   */
  public environments: { [key: string]: string };

  /**
   * Multiple environments by file
   *
   * @memberof ConfigFile
   */
  public multiple?: boolean;

  /**
   * File extension.
   * Default: json
   * EG: 'json' or 'txt'
   * @memberof ConfigFile
   */
  public extension?: string;

  /**
   * File path
   * EG: /assets/
   *
   * @memberof ConfigFile
   */
  public path?: string;
}
