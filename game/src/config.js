// Ember Spot the Difference: level catalogue and shared panel geometry.
// Three original scenes, drawn in code, getting harder: more differences,
// smaller targets, subtler changes, less time.
export const PANEL = { w: 560, h: 460, gap: 40, x0: 40, x1: 640, y: 118 };
export const CANVAS = { w: 1280, h: 720 };

export const LEVELS = [
  {
    id: 'garden',
    name: '1 · Ember Garden',
    subtitle: 'A sunny garden cottage — warm up your eyes',
    time: 150,
    hints: 3,
    blurb: '7 differences · generous targets · 2:30',
  },
  {
    id: 'harbour',
    name: '2 · Ember Harbour',
    subtitle: 'Dusk at the little harbour — look closer',
    time: 120,
    hints: 3,
    blurb: '8 differences · smaller targets · 2:00',
  },
  {
    id: 'market',
    name: '3 · Ember Night Market',
    subtitle: 'Lanterns, stalls and crowds — the real hunt',
    time: 100,
    hints: 2,
    blurb: '10 differences · subtle colours · 1:40',
  },
];

export const SCORE = { find: 100, hintCost: 25, wrong: 10, timeBonus: 5, levelBonus: 250 };
export const WRONG_TIME_PENALTY = 5;
