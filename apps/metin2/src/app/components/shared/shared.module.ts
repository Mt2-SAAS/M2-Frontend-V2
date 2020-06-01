import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Importando componentes.
import { NavbarComponent } from './navbar/navbar.component';
import { UserManagerComponent } from './user-manager/user-manager/user-manager.component';
import { PlayersListComponent } from './user-manager/players/players.component';
import { PasswdComponent } from './user-manager/password/password.component';
import { DonationsComponet } from './user-manager/donation/donations.componet';
import { MainManagerComponent } from './user-manager/main/main.components';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login_form.component';
import { ChatComponet } from './user-manager/chat/chat.component';

// Widgets
// Guild
import { GuildsComponent } from './wigets/guilds/guilds.component';
import { ListGuildComponent } from './wigets/guilds/list-guild.component'
// Players
import { PlayersComponent } from './wigets/players/players.component';
import { ListPlayersComponent } from './wigets/players/list-player.component';
// Statics
import { StaticsComponent } from './wigets/statics/statics.component';
import { SidebarComponent } from './wigets/sidebar/sidebar.component';


@NgModule({
    declarations: [
        NavbarComponent,
        UserManagerComponent,
        PlayersListComponent,
        PasswdComponent,
        DonationsComponet,
        PlayersComponent,
        GuildsComponent,
        LoginComponent,
        StaticsComponent,
        SidebarComponent,
        MainManagerComponent,
        LoginFormComponent,
        ListGuildComponent,
        ListPlayersComponent,
        ChatComponet
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        NavbarComponent,
        UserManagerComponent,
        LoginComponent,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
})
export class SharedModule {}
