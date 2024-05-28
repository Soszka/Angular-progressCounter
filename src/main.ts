import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from '../src/app/app.routes';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './app/api/firebase-config';
import { provideAuth, getAuth } from '@angular/fire/auth';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      BrowserModule,
      BrowserAnimationsModule,
      NgxChartsModule,
      HttpClientModule,
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    )
  ]
}).catch(err => console.error(err));