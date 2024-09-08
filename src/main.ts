import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from '../src/app/app.routes';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {} from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './app/api/firebase-config';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { A11yModule } from '@angular/cdk/a11y';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      NgxChartsModule,
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
      A11yModule
    ),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
}).catch((err) => console.error(err));
