import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgPipesModule} from "ngx-pipes";
import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {SidePaneComponent} from "./side-pane/side-pane.component";
import {BrowsePaneComponent} from "./browse-pane/browse-pane.component";
import {SpoonacularService} from "./model/spoonacular.service";
import {DinnerService} from "./model/dinner.service";
import {DishesGridComponent} from "./dishes-grid/dishes-grid.component";
import {DishCardComponent} from "./dish-card/dish-card.component";
import {DishListItemComponent} from "./dish-list-item/dish-list-item.component";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {GuestCounterComponent} from "./guest-counter/guest-counter.component";

const appRoutes: Routes = [
  //{ path: 'crisis-center', component: WelcomeComponent },
  //{ path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: {title: 'Heroes List'}
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'overview',
    component: OverviewPageComponent
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    HomeComponent,
    SidePaneComponent,
    BrowsePaneComponent,
    DishesGridComponent,
    DishCardComponent,
    DishListItemComponent,
    OverviewPageComponent,
    GuestCounterComponent
  ],
  imports: [
    NgPipesModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [SpoonacularService, DinnerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
