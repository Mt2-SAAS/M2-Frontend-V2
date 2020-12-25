import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Store
// import { Store } from '@ngrx/store';
// import { AppState } from '@store';
// import { ShowRankingPlayerModal, InitLoadPlayers } from '@store/actions';
import { AuthenticateService } from '@metin2/api';

@Component({
  selector: 'promo',
  templateUrl: './promo.component.html',
  styles: []
})
export class PromoComponent implements OnInit {

  status: string;
  form: FormGroup
  loading: boolean;

  constructor(
    // private store: Store<AppState>
    private auth: AuthenticateService
  ) {
    this.form = new FormGroup({
        code : new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
        ]),
      });
  }

  ngOnInit() {

  }

  send(){
    let code = this.form.value['code'];
    this.auth.use_payment_code(code)
        .subscribe(
            ({status}) => {
                this.status = status;
                this.form.reset();
                this.clean_fields();
            },
            err => {
                this.status = err.error.status;
                this.form.reset();
                this.clean_fields();
            }
        );

  }

  clean_fields() {
    setTimeout(() => {
        this.status = '';
    }, 5000)
  }

}
