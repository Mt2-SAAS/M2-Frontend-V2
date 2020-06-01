import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

// Main Component
import { MainComponent } from './main/main.component';

// Auth Guard
import { AuthGuardService } from './services/auth/auth-guard.service';


// Components
import { MainManagerComponent } from './components/shared/user-manager/main/main.components';
import { ChatComponet } from './components/shared/user-manager/chat/chat.component';
import { DonationsComponet } from './components/shared/user-manager/donation/donations.componet';
import { PasswdComponent } from './components/shared/user-manager/password/password.component';
import { PlayersListComponent } from './components/shared/user-manager/players/players.component';

const RootRoutes: Routes = [
    { 
        path: '', 
        component: MainComponent,
    },
    {
        path: 'modal',
        component: MainComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'main', component: MainManagerComponent, outlet: 'modal' },
            { path: 'chat', component: ChatComponet, outlet: 'modal' },
            { path: 'donations', component: DonationsComponet, outlet: 'modal' },
            { path: 'pass', component: PasswdComponent, outlet: 'modal' },
            { path: 'players', component: PlayersListComponent, outlet: 'modal' },
        ]
    },
    { path: '**', component: MainComponent }
];

const RoutesConfig: ExtraOptions = {
    useHash: true
};

@NgModule({
    imports: [

        RouterModule.forRoot(RootRoutes, RoutesConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
