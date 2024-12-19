import { Routes } from '@angular/router';
import { Authentication } from './features/authentication/authentication.component';
import { LandingPage } from './features/landingpage/landingpage.component';

export const routes: Routes = [
  { path: '', component: LandingPage }, // Default route
  { path: 'authentication', component: Authentication },
];