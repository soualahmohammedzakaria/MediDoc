import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), // Import routes
  ],
  providers: [],
  bootstrap: [], // No direct bootstrap here; routes handle it
})
export class AppModule {}