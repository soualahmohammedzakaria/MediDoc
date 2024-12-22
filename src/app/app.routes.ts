import { Routes } from '@angular/router';
import { Authentication } from './features/authentication/authentication.component';
import { LandingPage } from './features/landingpage/landingpage.component';
import { AppComponent } from './app.component';
import { Creerdpi } from './features/administratif/creerdpi/creerdpi.component';
import { MedecinRechercherPatientComponent } from './features/medecin/rechercher/rechercher.component';
import { PatientDpiComponent } from './features/patient/dpi/dpi.component';
import { InfirmierRechercherPatientComponent } from './features/infirmier/rechercher/rechercher.component';
import { SoinsComponent } from './features/infirmier/soins/soins.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'landingpage', component: LandingPage },
  { path: 'authentication', component: Authentication },
  { path: 'administratif/creerdpi', component: Creerdpi },
  { path: 'medecin/rechercher', component: MedecinRechercherPatientComponent },
  { path: 'infirmier/rechercher', component: InfirmierRechercherPatientComponent },
  { path: 'infirmier/soins', component: SoinsComponent },
  { path: 'patient/dpi', component: PatientDpiComponent },
];