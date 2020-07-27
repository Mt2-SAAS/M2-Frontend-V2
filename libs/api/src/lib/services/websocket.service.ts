import { Injectable } from "@angular/core";

// Store
import { Store } from '@ngrx/store';
import { AppState } from '@store';

// Import Socket
import { Socket } from 'ngx-socket-io';

// RXJS
import { Observable } from 'rxjs';

// Interface
import { UserLogin } from '@metin2/api';

@Injectable()
export class WebsocketService {

    user: UserLogin
    socketStatus: boolean;

    constructor(
        private socket: Socket,
        private store: Store<AppState>
    ) {
        this.check_status();
        this.store.select('user').subscribe(({user}) => {
            this.user = user;
        });
    }

    check_status() {

        if(!this.socketStatus){
            this.socket.connect();
        }

        this.socket.on('connect', () => {
            this.socketStatus = true;
        });

        this.socket.on('disconnect', () => {
            this.socketStatus = true;
        });
    }

    listen(event: string): Observable<unknown> {
        return this.socket.fromEvent(event);
    }

    emit(event: string, payload?: any, callback?: Function): void {
        this.socket.emit(event, payload, callback);
    }

    websocketLogin() {
        if(!this.socketStatus) {
            this.socket.connect();
        }
        const { login } = this.user;
        const color = localStorage.getItem('color') ? localStorage.getItem('color') : null;
        this.emit('config-user', {login, color});
    }

    websocketLogout() {
        // const payload = {login: null};
        // this.emit('disconnect');
        if(localStorage.getItem('color')) {
            localStorage.removeItem('color');
        }
        this.socketStatus = false;
        this.socket.disconnect();
    }

}
