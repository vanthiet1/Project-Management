import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule , provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
// share service
import { SharedPathService } from './services/shares/shared-path.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    SharedPathService,
    CommonModule,
    provideClientHydration(),
    importProvidersFrom(CommonModule, HttpClientModule),
    provideHttpClient(withFetch())
  ],
};
