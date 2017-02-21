import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BrowseComponent} from './browse/browse.component';
import {SidePaneComponent} from './side-pane/side-pane.component';
import {BrowsePaneComponent} from './browse-pane/browse-pane.component';
import {DishesService} from "./dishes.service";
import {DinnerService} from "./dinner.service";

const appRoutes: Routes = [
  //{ path: 'crisis-center', component: WelcomeComponent },
  //{ path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: {title: 'Heroes List'}
  },
  {
    path: 'browse',
    component: BrowseComponent
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
    BrowseComponent,
    SidePaneComponent,
    BrowsePaneComponent
  ],
  imports: [
    //NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DishesService, DinnerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
