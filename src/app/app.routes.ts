import { Routes } from '@angular/router';
import { Authentication } from './features/authentication/authentication.component';
import { LandingPage } from './features/landingpage/landingpage.component';
import { AppComponent } from './app.component';
import { Creerdpi } from './features/administratif/creerdpi/creerdpi.component';
import { MedecinRechercherPatientComponent } from './features/medecin/rechercher/rechercher.component';
import { PatientDpiComponent } from './features/patient/dpi/dpi.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'landingpage', component: LandingPage },
  { path: 'authentication', component: Authentication },
  { path: 'administratif/creerdpi', component: Creerdpi },
  { path: 'medecin/rechercher', component: MedecinRechercherPatientComponent },
  { path: 'patient/dpi', component: PatientDpiComponent },
];