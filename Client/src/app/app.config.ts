import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
// share service
import { SharedPathService } from './services/shares/shared-path.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    SharedPathService,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule,
    provideClientHydration(),
    importProvidersFrom(CommonModule, HttpClientModule),
  ],
};
