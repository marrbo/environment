import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { GoEnvironmentModule } from "@3go/environment";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoEnvironmentModule.forRoot({
      name: "aslib",
      environments: {
        "localhost": "localhost",
        "prod": "127.0.0.1"
      }
    })
  ],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
