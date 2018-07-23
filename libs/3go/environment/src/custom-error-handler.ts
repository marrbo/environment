import { ErrorHandler } from "@angular/core";

export class CustomErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }

  public handleError(error: any): void {
    super.handleError(error);
  }
}
