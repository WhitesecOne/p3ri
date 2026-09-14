import * as migration_20260906_093843_initial from './20260906_093843_initial';
import * as migration_20260906_151327_add_events_board from './20260906_151327_add_events_board';

export const migrations = [
  {
    up: migration_20260906_093843_initial.up,
    down: migration_20260906_093843_initial.down,
    name: '20260906_093843_initial',
  },
  {
    up: migration_20260906_151327_add_events_board.up,
    down: migration_20260906_151327_add_events_board.down,
    name: '20260906_151327_add_events_board'
  },
];
