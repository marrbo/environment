import { HttpClient } from "@angular/common/http";
import { ConfigFile } from "./config-file";
import "rxjs/add/operator/toPromise";
import { Injectable } from "@angular/core";

export function hasValue<T>(value: T): boolean {
  return value !== undefined && value !== null;
}

/**
 * Enviroment service. Read file with configurations
 *
 */
@Injectable()
export class GoEnvironmentService {
  public params: any = {};
  private _hostname = document.location.hostname;
  private _configFile = "aslib.config";
  private _storageName = "localhost";

  // construtor
  constructor(private envConfig: ConfigFile, private _http: HttpClient) {
    this.testConfig();
    this.setHostName();
    this.config();
  }

  private setHostName(): void {
    // varre as opções de ambiente para definir o nome do ambiente atual
    const urls = this.envConfig.environments;

    Object.keys(urls).forEach((optionName: string) => {
      const value: string = urls[optionName];
      if (hasValue(value)) {
        if (document.location.hostname === value) {
          this._hostname = optionName.toLowerCase();
        }
      }
    });
  }

  private testConfig(): void {
    // verifica se foi definido algum valor customizado
    // atribui as configurações inicias.
    // define os valores padrão para os campos sem valor
    if (this.envConfig === void 0) {
      this.envConfig = {
        name: "config",
        extension: "json",
        path: "./assets/",
        environments: { "localhost": "localhost" }
      };
    } else {
      if (this.envConfig.name === void 0) {
        this.envConfig.name = "config";
      }

      if (this.envConfig.extension === void 0) {
        this.envConfig.extension = "json";
      }

      if (this.envConfig.multiple === void 0) {
        this.envConfig.multiple = true;
      }

      if (this.envConfig.path === void 0) {
        this.envConfig.path = "./assets/";
      }

      if (this.envConfig.environments === void 0) {
        this.envConfig.environments = { "localhost": "localhost" };
      }
    }
  }

  /// método público que devolve as configurações lidas com o tipo especificado
  public async config(): Promise<any> {
    const _aslibDefault: string = "/3go.environment/";

    /// define o nome do session storage
    this._storageName = `${_aslibDefault}${this._hostname}/${
      this.envConfig.name
    }.${this.envConfig.extension}`;

    /// define o local e nome do arquivo
    this._configFile = `${this.getPath()}${
      this.envConfig.name
    }.${this.getExtension()}`;

    /// retorna conteúdo do arquivo como promisse
    return this.getJSON();
  }

  /// leitura do arquivo definido
  private async getJSON(): Promise<any> {
    // const data = sessionStorage[this._storageName];
    let jsonRetorno: any = await this.getStorage();

    /// verifica se já existe configuração na sessão
    if (jsonRetorno === null) {
      /// aguarda finalização de leitura do arquivo
      const response: any = await this._http
        .get<any>(this._configFile)
        .toPromise()
        .catch(this.handleError);

      try {
        /// verificar se o retorno da leitura do arquivo está OK
        if (response) {
          /// lendo retorno como json
          jsonRetorno = response;
          this.params = jsonRetorno[this._hostname];
          /// criptografa conteúdo do retorno antes de gravar na session storage
          this.setStorage(jsonRetorno);
        }
      } catch (error) {
        // gera exceção
        throw error;
      }
    }

    if (jsonRetorno) {
      this.params = jsonRetorno[this._hostname];
      return this.params;
    } else {
      return {};
    }
  }

  private setStorage(storageData: any[]): void {
    sessionStorage.setItem(
      this._storageName,
      btoa(JSON.stringify(storageData))
    );
  }

  public async replace(enviromentAngular: any): Promise<any> {
    Object.keys(this.params).forEach((optionName: string) => {
      const value: string = this.params[optionName];
      enviromentAngular[optionName] = value;
    });
  }

  private async getStorage(): Promise<any | null> {
    const data: string | null = sessionStorage.getItem(this._storageName);
    let returnData: any = null;

    if (data !== null) {
      /// descriptografa os dados existentes na sessão
      const ret: any[] = JSON.parse(atob(data));
      returnData = ret;
    }
    return returnData;
  }

  private handleError(error: any): Promise<any> {
    console.error(
      `Falha na leitura do arquivo de configurações: [${this._configFile}]`,
      error
    );
    return Promise.reject(error.message || error);
  }

  /// monta o path do arquivo
  private getPath(): string {
    if (this.envConfig.path) {
      if (this.envConfig.path[this.envConfig.path.length - 1] !== "/") {
        this.envConfig.path += '/';
     }
    }


    return this.envConfig.path || `${document.location.href}./assets/`;
  }

  /// monta a extensão do arquivo
  private getExtension(): string {
    let _ext: string = this.envConfig.extension || "json";
    if (_ext[0] === ".") {
      _ext = _ext.replace(".", "");
    }
    return _ext;
  }
}
