import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { LandingPage } from './app/features/landingpage/landingpage.component';

const bootstrap = () => bootstrapApplication(LandingPage, config);

export default bootstrap;
