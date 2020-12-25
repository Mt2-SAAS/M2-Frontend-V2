import { createReducer, on } from '@ngrx/store';
import { ServerStats } from '@metin2/api';
import {
  ShowLoginModal,
  HiddenLoginModal,
  ShowRankingGuildModal,
  HiddenRankingGuildModal,
  ShowRankingPlayerModal,
  HiddenRankingPlayerModal,
  ShowProfileModal,
  HiddenProfileModal,
  GetServerStatics,
  InitGetServerStatics
} from '../actions';


export interface UIState {
    modal_login: boolean;
    modal_profile: boolean;
    modal_ranking_guild: boolean;
    modal_ranking_player: boolean;
    server_stats: ServerStats;
    loading: boolean;
}

export const UIInitialState: UIState = {
    modal_login: false,
    modal_profile: false,
    modal_ranking_guild: false,
    modal_ranking_player: false,
    server_stats: {
      online: 0,
      lastonline: 0,
      accounts: 0,
      players: 0
    },
    loading: false,
}

const _UIReducer = createReducer(UIInitialState,
  on(ShowLoginModal, (state, {show}) => ({
      ...state,
      modal_login: show
    })),
  on(HiddenLoginModal, (state, {hidden}) => ({
      ...state,
      modal_login: !hidden
  })),
  on(ShowRankingGuildModal, (state, {show}) => ({
    ...state,
    modal_ranking_guild: show
  })),
  on(HiddenRankingGuildModal, (state, {hidden}) => ({
    ...state,
    modal_ranking_guild: !hidden
  })),
  on(ShowRankingPlayerModal, (state, {show}) => ({
    ...state,
    modal_ranking_player: show
  })),
  on(HiddenRankingPlayerModal, (state, {hidden}) => ({
    ...state,
    modal_ranking_player: !hidden
  })),
  on(ShowProfileModal, (state, {show}) => ({
    ...state,
    modal_profile: show
  })),
  on(HiddenProfileModal, (state, {hidden}) => ({
    ...state,
    modal_profile: !hidden
  })),
  on(InitGetServerStatics, (state) => ({
    ...state,
    loading: true
  })),
  on(GetServerStatics, (state, {statics}) => ({
    ...state,
    server_stats: statics,
    loading: false
  }))
);

export function UIReducer(state, action) {
  return _UIReducer(state, action);
}
