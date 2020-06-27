import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// SocketService
import { WebsocketService } from './websocket.service';

// import services
import { HttpService } from './http/http.service';
import { AuthenticateService } from './http/authenticate.service';
import { SignupService } from './signup.service';

// Auth Services
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { ErrorInterceptor } from './error-interceptor';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule
    ],
    exports: [],
    providers: [],
})

export class ServicesModule {
    static forRoot(): ModuleWithProviders<ServicesModule> {
        return {
            ngModule: ServicesModule,
            providers: [
                HttpService,
                AuthenticateService,
                AuthService,
                AuthGuardService,
                WebsocketService,
                SignupService,
                ErrorInterceptor
            ]
        };
    }
}
