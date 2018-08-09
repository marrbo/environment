/**
 * Principal Module import
 */
import { GoEnvironmentModule } from "./go-environment.module";

/**
 * Service import
 */
import { GoEnvironmentService } from "./go-environment.service";

/**
 * Config file import
 */
import { ConfigFile } from "./config-file";

// importa DTO do ambiente que irá armazenar o(s) arquivo(s)
/**
 * Enviroments interface
 */
import { IEnviroments } from "./enviroments";

/**
 * Export all objects (moudles, services, interfaces)
 */
export {
  GoEnvironmentModule,
  GoEnvironmentService,
  ConfigFile,
  IEnviroments
};
