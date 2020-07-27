import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Redux
import { Store } from '@ngrx/store';
import { giphyState } from './redux';

// import { environment } from '@env/environment':

@Injectable()
export class GiphyService {

    API_URL: string = 'https://api.giphy.com';
    API_KEY: string; // = environment.giphyKey;

    constructor(
        private _http: HttpClient,
        private store: Store<giphyState>
    ) {
        this.store.select('giphy').subscribe(({apikey}) => {
            this.API_KEY = apikey;
        })
    }

    search(payload: string) {
        const limit: string = '10';
        const url: string = `${this.API_URL}/v1/gifs/search?api_key=${this.API_KEY}&q=${payload}&limit=${limit}&offset=0&rating=g&lang=es`;

        return this._http.get(url);
    }

    trending() {
        const limit: string = '10';
        const url: string = `${this.API_URL}/v1/gifs/trending?api_key=${this.API_KEY}&limit=${limit}&offset=0&rating=g&lang=es`;

        return this._http.get(url);
    }

    random() {
        const limit: string = '10';
        const url: string = `${this.API_URL}/v1/gifs/random?api_key=${this.API_KEY}&limit=${limit}&offset=0&rating=g&lang=es`;

        return this._http.get(url);

    }

}
