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
import { WSUser, DataGram } from '@metin2/api';
import { LoadWSUsers } from '@store/actions';
import { HttpService } from '@metin2/api';

// env
import { environment } from '@env/environment';


@Component({
  selector: 'manager-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponet implements OnInit, OnDestroy, AfterViewInit {

  user: string;
  color: string;
  users: WSUser[];
  messages: DataGram[];
  messageForm: FormGroup;
  wsObserverMessage: Subscription = new Subscription();
  wsObserverUsers: Subscription = new Subscription();

  // Gifs
  showGifPicker = false;
  gifUrl: string;
  giphyKey: string = environment.giphyKey;

  // Emojis
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'facebook';

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
      ({messages}: {ok: string, messages: DataGram[]}) => {
        // console.log(messages);
        messages.reverse();
        this.store.dispatch(LoadMessages({messages}));
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
    this.wsObserverMessage = this.ws.listen('messages').subscribe( (message: DataGram) => {
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
    if (messageValue === null || messageValue === '' || messageValue.length < 2) return;

    const dateValue = new Date().toDateString();
    const color = this.color;
    const payload: DataGram = {
      userlogin: this.user,
      create_at: dateValue,
      payload: {
        color: color,
        message: messageValue,
        gif: this.gifUrl,
      }
    }
    this.ws.emit('messages', payload);
    this.messageForm.reset();
    this.gifUrl = null;
  }

  addEmoji(event) {
    let message: string;
    const input: HTMLInputElement = document.querySelector('.input-chat');

    if (this.messageForm.value.message === null) {
      message = `${event.emoji.native}`;
    } else {
      message = `${this.messageForm.value.message}${event.emoji.native}`;
    }
    this.messageForm.patchValue({
      message
    });
    this.showEmojiPicker = false;
    input.focus();
  }

  addGif(event) {
    const input: HTMLInputElement = document.querySelector('.input-chat');

    this.gifUrl = `${event.url}`;

    this.showGifPicker = false;
    input.focus();
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  toggleGifPicker() {
    this.showGifPicker = !this.showGifPicker;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }

}
