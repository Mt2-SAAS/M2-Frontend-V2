import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { WebsocketService } from '@metin2/api';
import { AuthService } from '@metin2/api';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { AddMessage, LoadMessages } from '@store/actions';

// RXJS
import { Subscription } from 'rxjs';

// Interfaces
import { WSUser, Message } from '@metin2/api';
import { LoadWSUsers } from '@store/actions';
import { HttpService } from '@metin2/api';


@Component({
  selector: 'manager-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponet implements OnInit, OnDestroy, AfterViewInit {

  user: string;
  color: string;
  users: WSUser[];
  messages: Message[];
  messageForm: FormGroup;
  wsObserverMessage: Subscription = new Subscription();
  wsObserverUsers: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private ws: WebsocketService,
    private http: HttpService
  ) {
    this.messageForm = new FormGroup({
      message : new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()) {
      this.subcribeUser();
      this.wsLogin();
      this.listenMessage();
      this.listenOnlineUsers();
      this.subscribeMessages();
      this.subscribeUsersAndSetColor();
      this.getMessages();
      this.ws.emit('get-users');
    }
  }

  ngOnDestroy() {
    this.wsObserverMessage.unsubscribe();
    this.wsObserverUsers.unsubscribe();
    // this.wsLogout();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private wsLogin(){
    this.ws.websocketLogin();
  }

  private getMessages() {
    this.http.get_messages().subscribe(
      ({messages}: {ok: string, messages: Message[]}) => {
        // console.log(messages);
        this.store.dispatch(LoadMessages({messages: messages}));
        this.scrollToBottom();
      }
    );
  }

  private scrollToBottom() {
    const scroll = () => {
      let element = document.querySelector('.app-mensajes');
      element.scrollTop = element.scrollHeight;
    }
    setTimeout(scroll, 100);
  }

  private listenMessage() {
    // Listen messages in Websocket and send to store.
    this.wsObserverMessage = this.ws.listen('messages').subscribe( (message: Message) => {
      const payload = {...message}
      this.store.dispatch(AddMessage({message: payload}));
      // Waith dispatch
      this.scrollToBottom()
    });
  }

  private listenOnlineUsers() {
    // Listen user in Websocker and send to store
    this.wsObserverUsers  = this.ws.listen('active-users').subscribe( (users: WSUser[]) => {
      const payload = [...users];
      this.store.dispatch(LoadWSUsers({wsUsers: payload}));
    });
  }

  private subcribeUser() {
    this.store.select('user').subscribe(({user}) => {
      this.user = user.login
    });
  }

  private subscribeMessages() {
    // Listen messages in store and send to local property
    this.store.select('messages').subscribe(({messages}) => {
      this.messages = messages;
    });
  }

  private subscribeUsersAndSetColor() {
    this.store.select('messages').subscribe(({wsUsers}) => {
      this.users = wsUsers;
      // Set color
      wsUsers.forEach( user => {
        if(user.name == this.user) {
          this.color = user.color;
          localStorage.setItem('color', this.color);
        }
      });
    })
  }

  sendMessage() {
    const messageValue = this.messageForm.value.message;
    if (messageValue === '' || messageValue.length < 2) return;

    const dateValue = new Date().toDateString();
    const color = this.color;
    const payload: Message = {
      from: this.user,
      date: dateValue,
      color: color,
      message: messageValue
    }
    this.ws.emit('messages', payload);
    this.messageForm.reset();
  }

}
