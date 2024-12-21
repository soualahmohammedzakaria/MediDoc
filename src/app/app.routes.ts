import { Routes } from '@angular/router';
import { Authentication } from './features/authentication/authentication.component';
import { LandingPage } from './features/landingpage/landingpage.component';
import { AppComponent } from './app.component';
import { Creedpi } from './features/creedpi/creedpi.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'landingpage', component: LandingPage },
  { path: 'authentication', component: Authentication },
  { path: 'creedpi', component: Creedpi },


];