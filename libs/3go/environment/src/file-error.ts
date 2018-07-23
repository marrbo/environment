export class FileError {
  private FileName: string;

  constructor(fileName?: string, innerException?: any) {
    this.FileName = fileName;
  }

  toString(): string {
    return `Não foi possível ler o arquivo de configuração ${this.FileName ||
      null}.`;
  }
}
