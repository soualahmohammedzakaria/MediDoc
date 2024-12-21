import { Routes } from '@angular/router';
import { Authentication } from './features/authentication/authentication.component';
import { LandingPage } from './features/landingpage/landingpage.component';
import { AppComponent } from './app.component';
import { Creerdpi } from './features/administratif/creerdpi/creerdpi.component';
import { Recherchedpi } from './features/recherchedpi/recherchedpi.component';
import { Dossierpatient } from './features/dossierpatient/dossierpatient.component';


export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'landingpage', component: LandingPage },
  { path: 'authentication', component: Authentication },
  { path: 'administratif/creerdpi', component: Creerdpi },
  { path: 'recherchedpi', component: Recherchedpi },
  { path: 'dossierpatient', component: Dossierpatient },
];