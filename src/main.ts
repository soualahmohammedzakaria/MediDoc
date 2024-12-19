import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LandingPage } from './app/features/landingpage/landingpage.component';

bootstrapApplication(LandingPage, appConfig)
  .catch((err) => console.error(err));