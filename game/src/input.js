// Pointer and keyboard input: map a canvas click to a panel, test it
// against the level's unfound differences, and drive the title /
// level-done / win / game-over buttons. A click counts on either panel,
// so the player hunts with their eyes, not with panel rules.
import { PANEL } from './config.js';
import { diffsOf, markFound, markWrong, startGame, startLevel, useHint, SCREENS } from './state.js';

export function panelAt(x, y) {
  if (y < PANEL.y || y > PANEL.y + PANEL.h) return null;
  if (x >= PANEL.x0 && x <= PANEL.x0 + PANEL.w) return { side: 0, lx: x - PANEL.x0, ly: y - PANEL.y };
  if (x >= PANEL.x1 && x <= PANEL.x1 + PANEL.w) return { side: 1, lx: x - PANEL.x1, ly: y - PANEL.y };
  return null;
}

export function nearestDiff(state, lx, ly) {
  let best = null;
  let bestD = Infinity;
  for (const d of diffsOf(state)) {
    if (state.found.has(d.id)) continue;
    const dx = lx - d.x;
    const dy = ly - d.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < d.r + 6 && dist < bestD) {
      best = d;
      bestD = dist;
    }
  }
  return best;
}

function buttonAt(x, y) {
  // Buttons drawn by render.js in the bottom bar and on overlays.
  if (y >= 668 && y <= 706) {
    if (x >= 980 && x <= 1100) return 'hint';
    if (x >= 1110 && x <= 1240) return 'restart';
  }
  return null;
}

export function handleClick(state, sounds, x, y) {
  sounds.ensure();
  if (state.screen === SCREENS.TITLE) {
    if (y >= 430 && y <= 486) {
      if (x >= 440 && x <= 620) startLevel(state, 0);
      else if (x >= 640 && x <= 820) startLevel(state, 1);
      else if (x >= 840 && x <= 1020) startLevel(state, 2);
      else startGame(state);
    } else {
      startGame(state);
    }
    sounds.found();
    return;
  }
  if (state.screen === SCREENS.LEVEL_DONE) {
    if (state.levelIndex < 2) startLevel(state, state.levelIndex + 1);
    else {
      state.screen = SCREENS.WIN;
      sounds.win();
    }
    return;
  }
  if (state.screen === SCREENS.WIN || state.screen === SCREENS.OVER) {
    startGame(state);
    return;
  }
  const btn = buttonAt(x, y);
  if (btn === 'hint') {
    if (useHint(state, performance.now())) sounds.hint();
    return;
  }
  if (btn === 'restart') {
    startLevel(state, state.levelIndex);
    return;
  }
  const hit = panelAt(x, y);
  if (!hit) return;
  const diff = nearestDiff(state, hit.lx, hit.ly);
  if (diff) {
    markFound(state, diff);
    sounds.found();
    if (state.screen === SCREENS.LEVEL_DONE) sounds.win();
  } else {
    markWrong(state, hit.lx, hit.ly);
    sounds.wrong();
  }
}

export function handleKey(state, sounds, key) {
  const k = key.toLowerCase();
  if (k === 'm') {
    state.muted = !state.muted;
    sounds.enabled = !state.muted;
    return;
  }
  if (state.screen === SCREENS.TITLE && (k === 'enter' || k === ' ')) {
    startGame(state);
    return;
  }
  if (k === 'h' && state.screen === SCREENS.PLAY) {
    if (useHint(state, performance.now())) sounds.hint();
    return;
  }
  if (k === 'r') {
    if (state.screen === SCREENS.PLAY || state.screen === SCREENS.OVER) startLevel(state, state.levelIndex);
    return;
  }
  if (k === 'n' && state.screen === SCREENS.LEVEL_DONE) {
    if (state.levelIndex < 2) startLevel(state, state.levelIndex + 1);
    else state.screen = SCREENS.WIN;
  }
  if (k === '1' || k === '2' || k === '3') {
    if (state.screen === SCREENS.TITLE) startLevel(state, Number(k) - 1);
  }
}
