import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Component
import { GiphyComponent } from './giphy.component';

// Services
import { GiphyService } from './giphy.service';

// Redux Reducer
import { giphyReducer, EffectsArray } from './redux';

// Redux Module
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [
        GiphyComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forFeature('giphy', giphyReducer),
        EffectsModule.forFeature(EffectsArray)
    ],
    exports: [
        GiphyComponent
    ],
    providers: [
        GiphyService
    ],
})
export class GiphyModule {}
