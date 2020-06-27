import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// JWT Module
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

// Store and dev tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Effects
import { EffectsArray } from '@store/effects';

// Reducers
import { appReducers } from '@store';

// APP Component
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

// Modules
import { PagesModule } from './components/pages/pages.module';
import { SharedModule } from './components/shared/shared.module';
import { ServicesModule } from '@metin2/api';

// Router
import { AppRoutingModule } from './app.routing.module';

// Environment
import { environment } from '@env/environment';

// Token getter
import { token_getter } from '@metin2/api';

// SocketIO
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

// Error Interceptors
import { ErrorInterceptor } from '@metin2/api';

// JWT Config
const JWTConfig: JwtModuleOptions = {
  config: {
    tokenGetter: token_getter,
    whitelistedDomains: [ environment.baseUrl ],
    blacklistedRoutes: [
        environment.baseUrl + '/api/signup/',
        environment.baseUrl + '/api/token/',
    ]
  }
}

// SocketIO Config
const SocketConfig: SocketIoConfig = {
  url: environment.socketUrl
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    SharedModule,
    HttpClientModule,
    ServicesModule.forRoot(),
    JwtModule.forRoot(JWTConfig),
    AppRoutingModule,
    RouterModule,
    SocketIoModule.forRoot(SocketConfig),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot( EffectsArray ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
