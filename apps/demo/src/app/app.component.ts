import { Component, OnInit } from "@angular/core";
import { GoEnvironmentService } from "@3go/environment";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private envService: GoEnvironmentService) {}

  ngOnInit(): void {
    this.envService.config().then(
      () => this.envService.replace(environment)
    );
  }
}
