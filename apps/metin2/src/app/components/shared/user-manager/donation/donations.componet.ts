import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticateService } from '@metin2/api';

@Component({
  selector: 'manager-donations',
  templateUrl: './donations.componet.html',
  styles: []
})
export class DonationsComponet implements OnInit {

  iframeUrl: SafeResourceUrl

  constructor(
    private http: AuthenticateService,
    private dom: DomSanitizer
  ) { }

  ngOnInit() {

    this.http.get_payment_widget()
      .subscribe( (response: { widget: string }) => {
        this.iframeUrl = this.dom.bypassSecurityTrustResourceUrl(response.widget)
      });

  }

}
