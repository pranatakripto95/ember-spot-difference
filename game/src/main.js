// Ember Spot the Difference: bootstrap. One canvas, one animation loop,
// the timer, and the ?shot= staging used for the entry screenshots.
// Open game/index.html in a desktop browser; no network is used.
import { CANVAS } from './config.js';
import { freshState, tick, SCREENS } from './state.js';
import { render } from './render.js';
import { handleClick, handleKey } from './input.js';
import { stageShot } from './shots.js';
import { SoundBank } from './audio.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const state = freshState();
const sounds = new SoundBank();

const params = new URLSearchParams(window.location.search);
const shot = params.get('shot');
if (shot) {
  stageShot(shot, state);
} else {
  state.screen = SCREENS.TITLE;
}

function toCanvas(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * CANVAS.w,
    y: ((event.clientY - rect.top) / rect.height) * CANVAS.h,
  };
}

canvas.addEventListener('pointerdown', (event) => {
  const p = toCanvas(event);
  handleClick(state, sounds, p.x, p.y);
});

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') event.preventDefault();
  handleKey(state, sounds, event.key);
});

let last = performance.now();
let lastTickSecond = -1;
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  const before = Math.ceil(state.timeLeft);
  tick(state, dt);
  if (state.screen === SCREENS.PLAY && Math.ceil(state.timeLeft) !== before) {
    const sec = Math.ceil(state.timeLeft);
    if (sec <= 10 && sec !== lastTickSecond) {
      lastTickSecond = sec;
      sounds.tick();
    }
    if (sec === 0) sounds.lose();
  }
  render(ctx, state);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.__shotReady = true;
