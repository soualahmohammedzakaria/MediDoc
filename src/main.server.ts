import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { LandingPageComponent } from './app/features/landingpage/landingpage.component';

const bootstrap = () => bootstrapApplication(LandingPageComponent, config);

export default bootstrap;
