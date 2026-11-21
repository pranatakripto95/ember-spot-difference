// Screenshot staging behind ?shot= : each shot plays the real game into
// a fixed, readable frame — the same code the player runs, with no edits.
//   start   title screen over the Garden panels
//   play    Garden, 3 differences already ringed, 4 still hiding, counter visible
//   harbour Harbour, 2 differences ringed, 6 still hiding
//   win     Night Market cleared, level-clear banner up
// Any other value is the title screen.
import { SCREENS, startLevel, diffsOf } from './state.js';

export function stageShot(name, state) {
  if (name === 'play') {
    startLevel(state, 0);
    state.timeLeft = 98;
    state.score = 300;
    for (const id of ['sun', 'apple', 'flower']) {
      const d = diffsOf(state).find((x) => x.id === id);
      if (d) state.found.add(d.id);
    }
    state.message = 'Found: A flower changes colour! 4 to go.';
    return;
  }
  if (name === 'harbour') {
    startLevel(state, 1);
    state.timeLeft = 87;
    state.score = 520;
    for (const id of ['beam', 'sail']) {
      const d = diffsOf(state).find((x) => x.id === id);
      if (d) state.found.add(d.id);
    }
    state.message = 'Found: The sail turns red! 6 to go.';
    return;
  }
  if (name === 'win') {
    startLevel(state, 2);
    state.timeLeft = 41;
    state.score = 1840;
    for (const d of diffsOf(state)) {
      state.found.add(d.id);
      state.totalFound += 1;
    }
    state.screen = SCREENS.LEVEL_DONE;
    state.levelBonus = 455;
    state.score += 455;
    state.message = 'Level clear! Time bonus +455.';
    return;
  }
  // start (default): title over a fresh Garden.
  startLevel(state, 0);
  state.screen = SCREENS.TITLE;
  state.timeLeft = 150;
  state.score = 0;
}
