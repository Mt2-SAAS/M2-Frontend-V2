import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  fragment: string;

  constructor() {
    this.fragment = 'intro';
   }

  ngOnInit() {
    document.addEventListener('scroll', this.doScroll.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('scroll', this.doScroll.bind(this));
  }

  scroll( ) {
    const el = document.getElementById('navbar');
    el.scrollTop = el.scrollHeight;
  }

  doScroll() {
    const x = window.pageYOffset;
    switch(true) {
      case (x < 454):
        this.fragment = 'intro';
        break;

      case (x < 1366):
        this.fragment = 'info';
        break;

      case (x < 2228):
        this.fragment = 'info2';
        break;

      case (x < 3231):
        this.fragment = 'requirements';
        break;

      case (x < 3973 ):
        this.fragment = 'register';
        break;

      case (x < 4999):
        this.fragment = 'downloads';
        break;

      case (x < 5968):
        this.fragment = 'donations';
        break;
    }
  }

}
