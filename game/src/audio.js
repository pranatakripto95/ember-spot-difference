// Tiny WebAudio synth: every sound is generated, no audio files, no
// network. A found difference chimes, a wrong click buzzes low, a level
// win arpeggiates, and the last ten seconds tick.
export class SoundBank {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  tone(freq, start, dur, type, vol) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur);
  }

  found() {
    this.tone(660, 0, 0.14, 'sine', 0.22);
    this.tone(880, 0.09, 0.2, 'sine', 0.22);
    this.tone(1320, 0.18, 0.22, 'triangle', 0.12);
  }

  wrong() {
    this.tone(140, 0, 0.22, 'sawtooth', 0.12);
    this.tone(110, 0.05, 0.22, 'sawtooth', 0.1);
  }

  hint() {
    this.tone(520, 0, 0.12, 'sine', 0.15);
    this.tone(780, 0.08, 0.16, 'sine', 0.15);
  }

  win() {
    [523, 659, 784, 1047].forEach((f, i) => this.tone(f, i * 0.11, 0.28, 'triangle', 0.2));
  }

  lose() {
    [392, 330, 262].forEach((f, i) => this.tone(f, i * 0.16, 0.3, 'triangle', 0.16));
  }

  tick() {
    this.tone(980, 0, 0.06, 'square', 0.06);
  }
}
