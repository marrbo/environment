import { HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoEnvironmentService } from "./go-environment.service";
import { ConfigFile } from "./config-file";

/**
 * Principal module.
 * Starts config for file with Enviroment configs
 *
 */
@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class GoEnvironmentModule {
  /// método estático, recebe as configurações do arquivo de define os providers/serviços
  public static forRoot(envConfig?: ConfigFile): ModuleWithProviders {
    return {
      ngModule: GoEnvironmentModule,
      providers: [
        GoEnvironmentService,
        { provide: ConfigFile, useValue: envConfig }
      ]
    };
  }
}
