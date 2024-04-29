import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from '../src/app/app.routes';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    )
  ]
}).catch(err => console.error(err));
