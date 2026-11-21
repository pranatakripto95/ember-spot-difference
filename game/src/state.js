// Game state: one level at a time, with score, timer, hints and marks.
// Pure data plus the small transitions the game rules need; drawing lives
// in render.js and clicks live in input.js.
import { LEVELS, SCORE, WRONG_TIME_PENALTY } from './config.js';
import { DIFFERENCES, remainingFor } from './differences.js';

export const SCREENS = { TITLE: 'title', PLAY: 'play', LEVEL_DONE: 'level-done', WIN: 'win', OVER: 'over' };

export function freshState() {
  return {
    screen: SCREENS.TITLE,
    levelIndex: 0,
    found: new Set(),
    hinted: null,
    hintUntil: 0,
    wrongMarks: [],
    score: 0,
    totalFound: 0,
    timeLeft: LEVELS[0].time,
    hintsLeft: LEVELS[0].hints,
    best: 0,
    muted: false,
    message: 'Find every difference — click it on either picture.',
    levelBonus: 0,
    startedAt: 0,
  };
}

export function levelOf(state) {
  return LEVELS[state.levelIndex];
}

export function diffsOf(state) {
  return DIFFERENCES[levelOf(state).id];
}

export function remaining(state) {
  return remainingFor(levelOf(state).id, state.found);
}

export function startLevel(state, index) {
  state.levelIndex = index;
  state.found = new Set();
  state.hinted = null;
  state.wrongMarks = [];
  state.timeLeft = LEVELS[index].time;
  state.hintsLeft = LEVELS[index].hints;
  state.levelBonus = 0;
  state.screen = SCREENS.PLAY;
  state.message = `Level ${index + 1}: ${LEVELS[index].subtitle}`;
  state.startedAt = performance.now();
}

export function startGame(state) {
  state.score = 0;
  state.totalFound = 0;
  startLevel(state, 0);
}

export function markFound(state, diff) {
  state.found.add(diff.id);
  state.totalFound += 1;
  state.score += SCORE.find;
  state.message = `Found: ${diff.label}! ${remaining(state).length} to go.`;
  if (state.found.size === diffsOf(state).length) {
    const bonus = Math.round(state.timeLeft) * SCORE.timeBonus + SCORE.levelBonus;
    state.levelBonus = bonus;
    state.score += bonus;
    state.screen = SCREENS.LEVEL_DONE;
    state.message = `Level clear! Time bonus +${bonus}.`;
  }
}

export function markWrong(state, x, y) {
  state.wrongMarks.push({ x, y, until: performance.now() + 700 });
  state.timeLeft = Math.max(0, state.timeLeft - WRONG_TIME_PENALTY);
  state.score = Math.max(0, state.score - SCORE.wrong);
  state.message = `Not a difference — minus ${WRONG_TIME_PENALTY}s. Look again!`;
}

export function useHint(state, now) {
  const left = remaining(state);
  if (state.hintsLeft <= 0 || left.length === 0 || state.screen !== SCREENS.PLAY) return null;
  const pick = left[Math.floor(Math.random() * left.length)];
  state.hintsLeft -= 1;
  state.score = Math.max(0, state.score - SCORE.hintCost);
  state.hinted = pick;
  state.hintUntil = now + 2500;
  state.message = `Hint: look near the ${pick.label.toLowerCase()}… (−${SCORE.hintCost} pts)`;
  return pick;
}

export function tick(state, dt) {
  if (state.screen !== SCREENS.PLAY) return;
  state.timeLeft -= dt;
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    state.screen = SCREENS.OVER;
    state.message = 'Time ran out — the differences got away.';
  }
  const now = performance.now();
  if (state.hinted && now > state.hintUntil) state.hinted = null;
  state.wrongMarks = state.wrongMarks.filter((m) => m.until > now);
}
