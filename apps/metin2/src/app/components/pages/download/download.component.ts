import { Component, OnInit } from '@angular/core';
import { HttpService } from '@metin2/api';
import { Download } from '@metin2/api';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styles: []
})
export class DownloadComponent implements OnInit {

  downloads: Download[]

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.get_downloads();
  }

  get_downloads() {
    this.http.get_downloads()
      .subscribe(
        response => {
          this.downloads = response;
        }
       );
  }

}
