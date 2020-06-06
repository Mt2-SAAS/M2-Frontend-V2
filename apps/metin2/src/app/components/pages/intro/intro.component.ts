import { Component, OnInit } from '@angular/core';

// Environments
import { environment } from '@env/environment';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styles: []
})
export class IntroComponent implements OnInit {

  serverName: string

  constructor() { }

  ngOnInit() {
    this.serverName = environment.serverName;
  }

}
