// Scene painters: every picture is drawn in code, twice — once for the
// left panel and once for the right, with the right panel carrying the
// level's differences. No external images, so both panels always match
// except for the spots listed in differences.js.
function circle(ctx, x, y, r, fill) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}
function ellipse(ctx, x, y, rx, ry, fill) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}
function rect(ctx, x, y, w, h, fill) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
}
function cloud(ctx, x, y, s, fill) {
  circle(ctx, x, y, 18 * s, fill);
  circle(ctx, x + 20 * s, y - 8 * s, 22 * s, fill);
  circle(ctx, x + 42 * s, y, 18 * s, fill);
  rect(ctx, x - 14 * s, y, 68 * s, 16 * s, fill);
}
function flower(ctx, x, y, petal) {
  for (let i = 0; i < 5; i += 1) {
    const a = (i / 5) * Math.PI * 2;
    circle(ctx, x + Math.cos(a) * 9, y + Math.sin(a) * 9, 7, petal);
  }
  circle(ctx, x, y, 6, '#ffd23e');
  ctx.strokeStyle = '#2e7d32';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y + 8);
  ctx.lineTo(x, y + 34);
  ctx.stroke();
}

export function drawGarden(ctx, W, H, right) {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#8ec9ee');
  sky.addColorStop(1, '#dff3ff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  // Sun: golden on the left, ember-orange on the right.
  circle(ctx, 78, 66, 30, right ? '#ff7a2f' : '#ffd23e');
  ctx.strokeStyle = right ? '#ff7a2f' : '#ffd23e';
  ctx.lineWidth = 4;
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(78 + Math.cos(a) * 38, 66 + Math.sin(a) * 38);
    ctx.lineTo(78 + Math.cos(a) * 48, 66 + Math.sin(a) * 48);
    ctx.stroke();
  }
  cloud(ctx, 150, 52, 1, '#ffffff');
  if (!right) cloud(ctx, 385, 58, 0.9, '#ffffff');
  cloud(ctx, 480, 110, 0.7, '#f2f9ff');
  // Hills and path.
  ellipse(ctx, 120, 470, 260, 90, '#7ec850');
  ellipse(ctx, 430, 480, 280, 100, '#5fb23e');
  ctx.fillStyle = '#e8c98f';
  ctx.beginPath();
  ctx.moveTo(250, 460);
  ctx.lineTo(290, 460);
  ctx.lineTo(310, 330);
  ctx.lineTo(270, 330);
  ctx.closePath();
  ctx.fill();
  // Cottage.
  rect(ctx, 200, 180, 120, 120, '#fff3d6');
  ctx.fillStyle = '#e2574c';
  ctx.beginPath();
  ctx.moveTo(185, 185);
  ctx.lineTo(260, 120);
  ctx.lineTo(335, 185);
  ctx.closePath();
  ctx.fill();
  rect(ctx, 292, 96, 22, 52, '#b08968');
  if (!right) {
    circle(ctx, 268, 88, 12, '#ffffff');
    circle(ctx, 258, 70, 9, '#f4f4f4');
    circle(ctx, 276, 56, 7, '#ffffff');
  }
  rect(ctx, 246, 240, 28, 60, '#7b4b2a');
  circle(ctx, 268, 272, 3, '#ffd23e');
  // Window: warm and lit on the left, dark on the right.
  rect(ctx, 216, 192, 44, 34, right ? '#3a4a6b' : '#ffe27a');
  ctx.strokeStyle = '#7b4b2a';
  ctx.lineWidth = 3;
  ctx.strokeRect(216, 192, 44, 34);
  ctx.beginPath();
  ctx.moveTo(238, 192);
  ctx.lineTo(238, 226);
  ctx.moveTo(216, 209);
  ctx.lineTo(260, 209);
  ctx.stroke();
  // Tree with apples: one apple is missing on the right.
  rect(ctx, 158, 200, 18, 90, '#7b4b2a');
  circle(ctx, 150, 150, 42, '#3e9e4d');
  circle(ctx, 195, 140, 40, '#4cb45c');
  circle(ctx, 170, 110, 38, '#57c465');
  circle(ctx, 140, 165, 8, '#e23b3b');
  circle(ctx, 200, 160, 8, '#e23b3b');
  if (!right) circle(ctx, 182, 178, 8, '#e23b3b');
  circle(ctx, 165, 130, 7, '#e23b3b');
  // Fence with a cat that only sits there on the left.
  rect(ctx, 0, 300, W, 8, '#a9805a');
  rect(ctx, 0, 318, W, 8, '#a9805a');
  for (let x = 20; x < W; x += 46) rect(ctx, x, 292, 10, 44, '#c49a6c');
  if (!right) {
    ellipse(ctx, 452, 302, 16, 12, '#3d3d3d');
    circle(ctx, 464, 288, 9, '#3d3d3d');
    ctx.fillStyle = '#3d3d3d';
    ctx.beginPath();
    ctx.moveTo(458, 280);
    ctx.lineTo(462, 272);
    ctx.lineTo(466, 280);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(436, 296);
    ctx.quadraticCurveTo(420, 288, 424, 276);
    ctx.lineTo(428, 278);
    ctx.quadraticCurveTo(428, 290, 438, 296);
    ctx.fill();
  }
  // Flower bed: one bloom is pink on the left, blue on the right.
  flower(ctx, 90, 392, '#ff6fa5');
  flower(ctx, 170, 408, '#ffb347');
  flower(ctx, 250, 392, '#ffffff');
  flower(ctx, 322, 378, right ? '#4a90e2' : '#ff6fa5');
  flower(ctx, 400, 405, '#ffb347');
  flower(ctx, 480, 390, '#ff6fa5');
  // Birds.
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(330, 120);
  ctx.quadraticCurveTo(338, 112, 346, 120);
  ctx.quadraticCurveTo(354, 112, 362, 120);
  ctx.stroke();
}

export function drawHarbour(ctx, W, H, right) {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#2b2a55');
  sky.addColorStop(0.55, '#e07856');
  sky.addColorStop(1, '#f7b267');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  circle(ctx, 470, 80, 26, '#ffe9b0');
  // Sea.
  rect(ctx, 0, 300, W, 160, '#1f6f8b');
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 3;
  for (let y = 322; y < 450; y += 26) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.quadraticCurveTo(90, y - 6, 160, y);
    ctx.quadraticCurveTo(230, y + 6, 300, y);
    ctx.stroke();
  }
  // Lighthouse.
  rect(ctx, 72, 120, 44, 190, '#f5efe0');
  rect(ctx, 72, 150, 44, 22, '#e2574c');
  rect(ctx, 72, 210, 44, 22, '#e2574c');
  rect(ctx, 72, 270, 44, 22, '#e2574c');
  rect(ctx, 66, 92, 56, 30, '#334155');
  circle(ctx, 94, 107, 12, right ? '#3a4a6b' : '#ffe27a');
  // Flag: points right on the left panel, left on the right.
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(94, 92);
  ctx.lineTo(94, 58);
  ctx.stroke();
  ctx.fillStyle = '#e2574c';
  ctx.beginPath();
  if (right) {
    ctx.moveTo(94, 58);
    ctx.lineTo(66, 66);
    ctx.lineTo(94, 74);
  } else {
    ctx.moveTo(94, 58);
    ctx.lineTo(122, 66);
    ctx.lineTo(94, 74);
  }
  ctx.closePath();
  ctx.fill();
  // Beam: shining on the left, off on the right.
  if (!right) {
    ctx.fillStyle = 'rgba(255,226,122,0.45)';
    ctx.beginPath();
    ctx.moveTo(122, 100);
    ctx.lineTo(260, 70);
    ctx.lineTo(260, 128);
    ctx.closePath();
    ctx.fill();
  }
  // Gulls: two on the left, one on the right.
  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(170, 68);
  ctx.quadraticCurveTo(178, 60, 186, 68);
  ctx.quadraticCurveTo(194, 60, 202, 68);
  ctx.stroke();
  if (!right) {
    ctx.beginPath();
    ctx.moveTo(230, 90);
    ctx.quadraticCurveTo(238, 82, 246, 90);
    ctx.quadraticCurveTo(254, 82, 262, 90);
    ctx.stroke();
  }
  // Boat with a sail that turns red on the right.
  ctx.fillStyle = '#7b4b2a';
  ctx.beginPath();
  ctx.moveTo(230, 290);
  ctx.lineTo(360, 290);
  ctx.lineTo(340, 322);
  ctx.lineTo(250, 322);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#5d3a1f';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(295, 290);
  ctx.lineTo(295, 130);
  ctx.stroke();
  ctx.fillStyle = right ? '#e2574c' : '#ffffff';
  ctx.beginPath();
  ctx.moveTo(300, 140);
  ctx.lineTo(300, 282);
  ctx.lineTo(352, 282);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffd23e';
  ctx.beginPath();
  ctx.moveTo(290, 150);
  ctx.lineTo(290, 282);
  ctx.lineTo(248, 282);
  ctx.closePath();
  ctx.fill();
  // Porthole: lit on the left, dark on the right.
  circle(ctx, 268, 268, 9, right ? '#1f2937' : '#ffe27a');
  circle(ctx, 315, 268, 9, '#ffe27a');
  // Jumping fish: only on the left.
  if (!right) {
    ctx.fillStyle = '#9fd8ef';
    ctx.beginPath();
    ctx.ellipse(420, 330, 16, 8, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(434, 324);
    ctx.lineTo(446, 318);
    ctx.lineTo(444, 332);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(420, 348, 14, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }
  // Buoy: red on the left, green on the right.
  circle(ctx, 482, 382, 14, right ? '#2fbf71' : '#e23b3b');
  rect(ctx, 478, 362, 8, 12, '#334155');
  // Wooden dock and anchor: the anchor is gone on the right.
  rect(ctx, 440, 400, 120, 14, '#8a6b45');
  rect(ctx, 452, 414, 10, 40, '#8a6b45');
  rect(ctx, 528, 414, 10, 40, '#8a6b45');
  if (!right) {
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(520, 408, 12, 0, Math.PI, false);
    ctx.moveTo(520, 396);
    ctx.lineTo(520, 424);
    ctx.stroke();
    circle(ctx, 520, 392, 4, '#334155');
  }
}

export function drawMarket(ctx, W, H, right) {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#191238');
  sky.addColorStop(1, '#3b1f5e');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  // Moon: two craters on the left, one on the right.
  circle(ctx, 502, 62, 22, '#f5eeda');
  circle(ctx, 494, 56, 4, '#c9bfa0');
  if (!right) circle(ctx, 510, 68, 5, '#c9bfa0');
  circle(ctx, 506, 52, 3, '#c9bfa0');
  for (let i = 0; i < 14; i += 1) {
    const sx = 30 + ((i * 83) % 500);
    const sy = 24 + ((i * 37) % 90);
    circle(ctx, sx, sy, 2, 'rgba(255,255,255,0.8)');
  }
  // Festoon lights: one bulb is out on the right.
  ctx.strokeStyle = '#0f0a24';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 128);
  ctx.quadraticCurveTo(280, 178, 560, 128);
  ctx.stroke();
  for (let i = 0; i < 9; i += 1) {
    const t = i / 8;
    const bx = 20 + t * 520;
    const by = 128 + Math.sin(t * Math.PI) * 38;
    const out = right && i === 3;
    circle(ctx, bx, by + 8, 7, out ? '#3a3355' : ['#ffd23e', '#ff6fa5', '#7ee081'][i % 3]);
  }
  // Lanterns: the first turns green on the right; the second loses its tassel.
  circle(ctx, 92, 82, 18, right ? '#2fbf71' : '#ff5a3c');
  rect(ctx, 88, 62, 8, 8, '#ffd23e');
  if (!right) {
    rect(ctx, 90, 100, 4, 14, '#ffd23e');
    rect(ctx, 252, 88, 4, 12, '#ffd23e');
  }
  circle(ctx, 252, 72, 16, '#ff5a3c');
  rect(ctx, 248, 54, 8, 8, '#ffd23e');
  circle(ctx, 402, 122, 14, '#ffd23e');
  // Stall sign with a star that changes colour on the right.
  rect(ctx, 360, 96, 90, 44, '#2a1745');
  ctx.strokeStyle = '#ffd23e';
  ctx.lineWidth = 2;
  ctx.strokeRect(360, 96, 90, 44);
  ctx.fillStyle = right ? '#7ee081' : '#ffd23e';
  ctx.beginPath();
  for (let i = 0; i < 5; i += 1) {
    const a = -Math.PI / 2 + (i * 4 * Math.PI) / 5;
    const px = 402 + Math.cos(a) * 12;
    const py = 122 + Math.sin(a) * 12;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  // Left stall: fruit crate, one apple fewer on the right.
  rect(ctx, 60, 300, 180, 90, '#5d3a1f');
  rect(ctx, 60, 300, 180, 14, '#8a6b45');
  circle(ctx, 110, 332, 11, '#e23b3b');
  if (!right) circle(ctx, 152, 332, 11, '#e23b3b');
  circle(ctx, 190, 332, 11, '#7ee081');
  circle(ctx, 130, 358, 11, '#ffb347');
  circle(ctx, 175, 358, 11, '#e23b3b');
  // Centre stall under a striped umbrella that changes colour.
  ctx.fillStyle = right ? '#4a90e2' : '#e2574c';
  ctx.beginPath();
  ctx.moveTo(240, 210);
  ctx.quadraticCurveTo(332, 150, 424, 210);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(280, 210);
  ctx.quadraticCurveTo(332, 168, 384, 210);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(332, 202);
  ctx.lineTo(332, 150);
  ctx.stroke();
  rect(ctx, 250, 300, 170, 90, '#7b4b2a');
  rect(ctx, 250, 300, 170, 14, '#a9805a');
  // Vendor: hat is red on the left, blue on the right.
  circle(ctx, 282, 262, 20, '#f2c29b');
  ctx.fillStyle = right ? '#4a90e2' : '#e2574c';
  ctx.beginPath();
  ctx.arc(282, 252, 20, Math.PI, 0);
  ctx.fill();
  rect(ctx, 258, 248, 48, 8, right ? '#4a90e2' : '#e2574c');
  circle(ctx, 276, 260, 2, '#1f2937');
  circle(ctx, 288, 260, 2, '#1f2937');
  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(282, 268, 6, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
  rect(ctx, 262, 282, 40, 22, '#3b6ea5');
  // Right stall: jam jars, one jar gone on the right; cat above it.
  rect(ctx, 390, 300, 150, 90, '#5d3a1f');
  rect(ctx, 390, 300, 150, 14, '#8a6b45');
  rect(ctx, 402, 330, 26, 34, '#ff6fa5');
  rect(ctx, 442, 330, 26, 34, '#ffb347');
  if (!right) rect(ctx, 418, 328, 26, 36, '#c77dff');
  rect(ctx, 402, 322, 26, 8, '#ffd23e');
  rect(ctx, 442, 322, 26, 8, '#ffd23e');
  if (!right) rect(ctx, 418, 320, 26, 8, '#ffd23e');
  // Market cat: perched on the right stall on the left panel only.
  if (!right) {
    ellipse(ctx, 482, 282, 16, 12, '#e8e8e8');
    circle(ctx, 494, 268, 9, '#e8e8e8');
    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath();
    ctx.moveTo(488, 260);
    ctx.lineTo(492, 252);
    ctx.lineTo(496, 260);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(466, 276);
    ctx.quadraticCurveTo(452, 268, 456, 256);
    ctx.lineTo(460, 258);
    ctx.quadraticCurveTo(460, 270, 468, 276);
    ctx.fill();
  }
  // Cobbles.
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  for (let y = 410; y < 450; y += 16) {
    for (let x = (y % 32 === 0 ? 10 : 26); x < W; x += 32) {
      ctx.fillRect(x, y, 18, 8);
    }
  }
}

export const SCENES = { garden: drawGarden, harbour: drawHarbour, market: drawMarket };
