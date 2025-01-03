import { Routes } from '@angular/router';
import { Authentication } from './features/authentication/authentication.component';
import { LandingPage } from './features/landingpage/landingpage.component';
import { AppComponent } from './app.component';
import { Creerdpi } from './features/administratif/creerdpi/creerdpi.component';
import { MedecinRechercherPatientComponent } from './features/medecin/rechercher/rechercher.component';
import { PatientDpiComponent } from './features/patient/dpi/dpi.component';
import { LaborantinComponent } from './features/laborantin/laborantin.component';
import { RadiologueComponent } from './features/radiologue/radiologue.component';
import { InfirmierRechercherPatientComponent } from './features/infirmier/rechercher/rechercher.component';
import { SoinsComponent } from './features/infirmier/soins/soins.component';
import { MedecinAccueilComponent } from './features/medecin/accueil/accueil.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'landingpage', component: LandingPage },
  { path: 'authentication', component: Authentication },
  { path: 'administratif/creerdpi', component: Creerdpi },
  { path: 'medecin/rechercher', component: MedecinRechercherPatientComponent },
  { path: 'medecin', component: MedecinAccueilComponent },
  { path: 'infirmier/rechercher', component: InfirmierRechercherPatientComponent },
  { path: 'infirmier/soins', component: SoinsComponent },
  { path: 'patient/dpi', component: PatientDpiComponent },
  { path: 'laborantin', component: LaborantinComponent },
  { path: 'radiologue', component: RadiologueComponent }
];