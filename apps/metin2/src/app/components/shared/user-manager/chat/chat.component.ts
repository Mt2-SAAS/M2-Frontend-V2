import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { WebsocketService } from '../../../../services/websocket.service';
import { AuthService } from '../../../../services/auth/auth.service';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { AddMessage } from '../../../../store/actions';

// Interfaces
import { Message } from '../../../../interfaces';
import { Subscription } from 'rxjs';


@Component({
  selector: 'manager-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponet implements OnInit, OnDestroy {

  user: string;
  messages: Message[];
  messageForm: FormGroup;
  wsObserver: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private ws: WebsocketService,
  ) { 
    this.messageForm = new FormGroup({
      message : new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  ngOnInit() {
    
    this.store.select('user').subscribe(({user}) => {
      this.user = user.login
    });

    if(this.auth.isAuthenticated()) {
      this.wsLogin();
      this.listenMessage();
      this.subscribeMessage();
    }
  }

  ngOnDestroy() {
    this.wsObserver.unsubscribe();
    this.wsLogout();
  }

  private wsLogin(){
    this.ws.websocketLogin();
  }

  private wsLogout() {
    this.ws.websocketLogout();
  }

  sendMessages() {
    const messageValue = this.messageForm.value.message
    const dateValue = new Date().toDateString() 
    const payload: Message = {
      from: this.user,
      date: dateValue,
      message: messageValue
    }
    this.ws.emit('messages', payload);
    this.messageForm.reset();
  }

  listenMessage() {
    this.wsObserver = this.ws.listen('messages').subscribe( (message: Message) => {
      const payload = {...message}
      this.store.dispatch(AddMessage({message: payload}));
    });
  }

  subscribeMessage() {
    this.store.select('messages').subscribe(({messages}) => {
      this.messages = messages;
    });
  }

}
