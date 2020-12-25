import { createAction, props } from '@ngrx/store';

// Interfaces
import { Guild, Player } from '@metin2/api';

// Guild Actions
export const InitLoadGuilds = createAction(
    '[GUILDS] Init Load Guilds'
);

export const InitLoadPlayers = createAction(
    '[GUILDS] Init Load Players',
);

export const LoadGuilds = createAction(
    '[GUILDS] Load Guilds',
    props<{guilds: Guild[]}>()
);

export const LoadPlayers = createAction(
    '[GUILDS] Load Players',
    props<{players: Player[]}>()
);

export const LoadError = createAction(
    '[GUILDS] Load Error',
    props<{error: any[]}>()
);
