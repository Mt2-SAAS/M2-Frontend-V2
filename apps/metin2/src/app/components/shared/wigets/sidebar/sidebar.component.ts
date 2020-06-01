import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scroll( ) {
    const el = document.getElementById('navbar');
    el.scrollTop = el.scrollHeight;
  }

}
