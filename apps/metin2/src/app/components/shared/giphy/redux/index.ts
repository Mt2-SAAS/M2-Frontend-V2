import * as giphy from './giphy.reducers';

export * from './giphy.effects';
export * from './giphy.actions';
export * from './giphy.reducers';

export interface giphyState {
    giphy: giphy.GiphyState
}
