import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    data: {
      aslib: {
        menu: {
          text: "Exemplo @aslib/grid",
          aslibIcon: { type: 1, icon: "fa fa-fw fa-table" }
        }
      },
      ascas: { title: "Página Inicial" }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
