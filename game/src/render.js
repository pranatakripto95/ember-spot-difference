// All drawing on the one canvas: top bar, the two picture panels with
// their found-markers, the counter of what remains, and the overlays.
// The pictures themselves are painted once per level into offscreen
// canvases by scenes.js, then blitted here every frame.
import { PANEL, CANVAS, LEVELS } from './config.js';
import { diffsOf, levelOf, remaining, SCREENS } from './state.js';
import { SCENES } from './scenes.js';

const panelCache = new Map();

export function panelsFor(levelId) {
  if (panelCache.has(levelId)) return panelCache.get(levelId);
  const draw = SCENES[levelId];
  const pair = [0, 1].map((variant) => {
    const c = document.createElement('canvas');
    c.width = PANEL.w;
    c.height = PANEL.h;
    draw(c.getContext('2d'), PANEL.w, PANEL.h, variant === 1);
    return c;
  });
  panelCache.set(levelId, pair);
  return pair;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fmtTime(s) {
  const t = Math.max(0, Math.ceil(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
}

function drawMarker(ctx, px, py, d, num) {
  ctx.strokeStyle = '#2fbf71';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(px + d.x, py + d.y, d.r + 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(47,191,113,0.18)';
  ctx.fill();
  ctx.strokeStyle = '#2fbf71';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(px + d.x - 9, py + d.y);
  ctx.lineTo(px + d.x - 2, py + d.y + 8);
  ctx.lineTo(px + d.x + 11, py + d.y - 8);
  ctx.stroke();
  ctx.fillStyle = '#2fbf71';
  ctx.font = 'bold 15px Verdana, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(String(num), px + d.x, py + d.y - d.r - 8);
}

function drawPanels(ctx, state) {
  const [left, right] = panelsFor(levelOf(state).id);
  const foundList = diffsOf(state).filter((d) => state.found.has(d.id));
  const spots = [
    { canvas: left, x: PANEL.x0, tag: 'A' },
    { canvas: right, x: PANEL.x1, tag: 'B' },
  ];
  for (const s of spots) {
    ctx.drawImage(s.canvas, s.x, PANEL.y, PANEL.w, PANEL.h);
    ctx.strokeStyle = '#ffd23e';
    ctx.lineWidth = 3;
    ctx.strokeRect(s.x, PANEL.y, PANEL.w, PANEL.h);
    ctx.fillStyle = '#ffd23e';
    ctx.font = 'bold 20px Verdana, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(s.tag, s.x + 10, PANEL.y - 10);
    for (let i = 0; i < foundList.length; i += 1) drawMarker(ctx, s.x, PANEL.y, foundList[i], i + 1);
    if (state.hinted) {
      const pulse = 1 + 0.18 * Math.sin(performance.now() / 130);
      ctx.strokeStyle = '#ffd23e';
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 6]);
      ctx.beginPath();
      ctx.arc(s.x + state.hinted.x, PANEL.y + state.hinted.y, (state.hinted.r + 8) * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    for (const m of state.wrongMarks) {
      ctx.strokeStyle = '#ff4d4d';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(s.x + m.x - 12, PANEL.y + m.y - 12);
      ctx.lineTo(s.x + m.x + 12, PANEL.y + m.y + 12);
      ctx.moveTo(s.x + m.x + 12, PANEL.y + m.y - 12);
      ctx.lineTo(s.x + m.x - 12, PANEL.y + m.y + 12);
      ctx.stroke();
    }
  }
  ctx.fillStyle = '#b9a8d6';
  ctx.font = '15px Verdana, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Left picture', PANEL.x0 + 34, PANEL.y - 10);
  ctx.textAlign = 'right';
  ctx.fillText('Right picture — the differences hide here too', PANEL.x1 + PANEL.w - 10, PANEL.y - 10);
}

function drawTopBar(ctx, state) {
  const level = levelOf(state);
  ctx.fillStyle = '#1d1530';
  ctx.fillRect(0, 0, CANVAS.w, 76);
  ctx.fillStyle = '#ffd23e';
  ctx.font = 'bold 26px Verdana, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('EMBER SPOT THE DIFFERENCE', 40, 34);
  ctx.fillStyle = '#b9a8d6';
  ctx.font = '15px Verdana, sans-serif';
  ctx.fillText(level.name + '  ·  ' + level.subtitle, 40, 58);
  const low = state.timeLeft <= 20 && state.screen === SCREENS.PLAY;
  ctx.fillStyle = low ? '#ff4d4d' : '#f5eeda';
  ctx.font = 'bold 34px Verdana, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(fmtTime(state.timeLeft), 1240, 42);
  ctx.fillStyle = '#3a2f55';
  roundRect(ctx, 1020, 52, 220, 10, 5);
  ctx.fill();
  const frac = Math.max(0, state.timeLeft / level.time);
  ctx.fillStyle = low ? '#ff4d4d' : '#2fbf71';
  roundRect(ctx, 1020, 52, 220 * frac, 10, 5);
  ctx.fill();
  ctx.fillStyle = '#b9a8d6';
  ctx.font = '15px Verdana, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('SCORE ' + state.score, 1000, 60);
}

function drawBottomBar(ctx, state) {
  const total = diffsOf(state).length;
  const left = remaining(state).length;
  const found = total - left;
  ctx.fillStyle = '#1d1530';
  ctx.fillRect(0, 596, CANVAS.w, 124);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#f5eeda';
  ctx.font = 'bold 26px Verdana, sans-serif';
  ctx.fillText(`FOUND ${found} / ${total}`, 40, 632);
  ctx.fillStyle = left === 0 ? '#2fbf71' : '#ffd23e';
  ctx.font = 'bold 30px Verdana, sans-serif';
  ctx.fillText(`REMAINING ${left}`, 300, 632);
  ctx.fillStyle = '#b9a8d6';
  ctx.font = '16px Verdana, sans-serif';
  ctx.fillText(state.message, 40, 668);
  ctx.fillStyle = '#b9a8d6';
  ctx.font = '15px Verdana, sans-serif';
  ctx.fillText(`Hints: ${state.hintsLeft}  (H)`, 300, 692);
  ctx.fillText('Wrong click: −5s  ·  Hint: −25 pts', 40, 692);
  // Buttons.
  ctx.fillStyle = '#ffd23e';
  roundRect(ctx, 980, 668, 120, 38, 8);
  ctx.fill();
  ctx.fillStyle = '#1d1530';
  ctx.font = 'bold 16px Verdana, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HINT (H)', 1040, 692);
  ctx.fillStyle = '#3a2f55';
  roundRect(ctx, 1110, 668, 130, 38, 8);
  ctx.fill();
  ctx.fillStyle = '#f5eeda';
  ctx.fillText('RESTART (R)', 1175, 692);
}

function overlay(ctx, title, lines, cta) {
  ctx.fillStyle = 'rgba(10,6,20,0.72)';
  ctx.fillRect(0, 0, CANVAS.w, CANVAS.h);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd23e';
  ctx.font = 'bold 52px Verdana, sans-serif';
  ctx.fillText(title, 640, 190);
  ctx.fillStyle = '#f5eeda';
  ctx.font = '20px Verdana, sans-serif';
  lines.forEach((line, i) => ctx.fillText(line, 640, 250 + i * 34));
  if (cta) {
    ctx.fillStyle = '#ffd23e';
    ctx.font = 'bold 22px Verdana, sans-serif';
    ctx.fillText(cta, 640, 250 + lines.length * 34 + 30);
  }
}

export function render(ctx, state) {
  ctx.fillStyle = '#14101d';
  ctx.fillRect(0, 0, CANVAS.w, CANVAS.h);
  drawTopBar(ctx, state);
  drawPanels(ctx, state);
  drawBottomBar(ctx, state);
  if (state.screen === SCREENS.TITLE) {
    overlay(ctx, 'EMBER SPOT THE DIFFERENCE', [
      'Two pictures. One is lying. Find every difference —',
      'click it on either picture. Green rings mark what you found.',
      'Hints cost points, wrong clicks cost time. Three scenes,',
      '7 + 8 + 10 differences. How sharp are your eyes?',
      '',
      'Level 1 · Ember Garden — click, or press 1',
      'Level 2 · Ember Harbour — click, or press 2',
      'Level 3 · Ember Night Market — click, or press 3',
    ], 'Click anywhere to start · H hint · R restart · M sound');
  } else if (state.screen === SCREENS.LEVEL_DONE) {
    const next = state.levelIndex < 2 ? 'Click or press N for the next scene' : 'Click to see your victory';
    overlay(ctx, 'LEVEL CLEAR!', [
      `You found all ${diffsOf(state).length} differences in ${levelOf(state).name}.`,
      `Time bonus +${state.levelBonus}  ·  Score ${state.score}`,
      '',
      next,
    ], 'N — next level');
  } else if (state.screen === SCREENS.WIN) {
    overlay(ctx, 'YOU FOUND THEM ALL!', [
      `All ${state.totalFound} differences across 3 scenes. Final score ${state.score}.`,
      'Ember Garden, Ember Harbour and the Night Market —',
      'nothing hides from you now.',
    ], 'Click to play again');
  } else if (state.screen === SCREENS.OVER) {
    overlay(ctx, "TIME'S UP", [
      `You found ${diffsOf(state).length - remaining(state).length} of ${diffsOf(state).length} differences in ${levelOf(state).name}.`,
      'The unfound ones are still hiding in the right picture.',
      'Try again — they will not move.',
    ], 'Click or press R to retry this level');
  }
  const status = document.getElementById('status');
  if (status) {
    status.textContent = `${levelOf(state).name}. Found ${diffsOf(state).length - remaining(state).length} of ${diffsOf(state).length}. ${remaining(state).length} remaining. ${fmtTime(state.timeLeft)} left. Score ${state.score}.`;
  }
}
