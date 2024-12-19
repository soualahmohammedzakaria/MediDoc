import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { LandingPageComponent } from './app/features/landingpage/landingpage.component';

bootstrapApplication(LandingPageComponent, {
  providers: [provideRouter(appRoutes)],
}).catch((err) => console.error(err));
