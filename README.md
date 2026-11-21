[![make.fun](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/pranatakripto95/ember-spot-difference/rank.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/pranatakripto95/ember-spot-difference/reward.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)

# Ember Spot the Difference

An original spot-the-difference game for the make.fun
[best spot the difference game](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
bounty. Two near-identical pictures side by side, drawn in code — no
external images, no network. Click every difference on either picture.

## How to play

- **3 original scenes**, getting harder: Ember Garden (7 differences,
  2:30), Ember Harbour (8 differences, 2:00), Ember Night Market
  (10 differences, 1:40).
- **Green rings + check marks** land on every difference you find, with
  a number showing the order you found it. The bottom bar always shows
  **FOUND n / total** and **REMAINING n**.
- **Timer bar** up top, **score** for each find plus a time bonus on a
  level clear. A wrong click costs 5 seconds and 10 points; a hint
  (H or the HINT button) pulses a circle around an unfound difference
  for 2.5 seconds and costs 25 points.
- **Sounds** are synthesized in the browser (WebAudio) — a chime on a
  find, a buzz on a miss, an arpeggio on a win. M mutes.
- Keyboard: **H** hint, **R** restart level, **N** next level,
  **1 / 2 / 3** pick a scene from the title screen.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Static files only: `game/index.html` + its ES modules under `game/src/`.
Screenshots in `screenshots/` were taken by playing the real game in a
desktop browser (`?shot=play|start|harbour|win` stages each frame).

## Files

- `game/src/config.js` — levels, panel geometry, scoring
- `game/src/differences.js` — every difference spot, per level
- `game/src/scenes.js` — the three scenes, painted twice (left / right)
- `game/src/state.js` — level, timer, score, hints, found set
- `game/src/input.js` — pointer + keyboard, hit-testing
- `game/src/render.js` — top bar, panels, markers, HUD, overlays
- `game/src/audio.js` — WebAudio chimes, no audio files
- `game/src/shots.js` — `?shot=` staging for screenshots
- `game/src/main.js` — bootstrap + game loop
- `main.ts` — hand-in program: copies `game/` + `screenshots/` to
  `/output` and writes `dossier.json`
