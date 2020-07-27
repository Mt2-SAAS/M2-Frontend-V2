import { Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Interfaces
import { DownsizedLarge } from './giphy.interfaces';

// Redux
import { Store } from '@ngrx/store';
import { setKey, giphyState, InitLoadGif, InitSearch } from './redux';

@Component({
    selector: 'giphy',
    templateUrl: './giphy.component.html',
    styleUrls: ['./giphy.component.css'],
})
export class GiphyComponent implements OnInit {

    error: any;
    loader: boolean;
    imgs: DownsizedLarge[] = [];
    form: FormGroup;

    @Input() apikey: string;
    @Output() gifSelect: EventEmitter<DownsizedLarge> = new EventEmitter();


    constructor(
        private store: Store<giphyState>
    ) {
        this.form = new FormGroup({
            search: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ])
        })
    }

    ngOnInit() {

        // Subscribe to store
        this.store.select('giphy').subscribe(({imgs, loading, error}) => {
            this.imgs = imgs;
            this.loader = loading;
            this.error = error;
        });

        // Set APIKEY
        this.config();

        // Get trending gifs
        this.trending();

    }

    config() {
        this.store.dispatch(setKey({apikey: this.apikey}));
    }

    search() {
        const payload = this.form.value.search;
        this.store.dispatch(InitSearch({search: payload}))
    }

    trending() {
        this.store.dispatch(InitLoadGif());
    }

    select(img: DownsizedLarge) {
        this.gifSelect.emit(img);
    }

}
