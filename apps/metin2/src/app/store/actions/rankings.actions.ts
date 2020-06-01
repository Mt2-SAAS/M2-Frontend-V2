import { createAction, props } from '@ngrx/store';

// Interfaces
import { Guild, Player } from '../../interfaces/';

// Guild Actions

export const LoadGuilds = createAction(
    '[GUILDS] Load Guild',
    props<{guilds: Guild[]}>()
);

export const LoadPlayers = createAction(
    '[GUILDS] Load Player',
    props<{players: Player[]}>()
);

export const LoadError = createAction(
    '[GUILDS] Load Error',
    props<{error: any[]}>()
);
