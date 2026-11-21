// Difference spots for every level, in panel coordinates (560 x 460).
// Each entry is the centre and radius of one fair, findable change.
// The scene painter in scenes.js draws the altered version on the right
// panel for exactly these spots, so a click here always matches the art.
export const DIFFERENCES = {
  garden: [
    { id: 'sun', x: 78, y: 66, r: 30, label: 'Sun turns orange' },
    { id: 'cloud', x: 405, y: 58, r: 26, label: 'A cloud vanishes' },
    { id: 'apple', x: 182, y: 178, r: 17, label: 'An apple is gone' },
    { id: 'smoke', x: 268, y: 88, r: 20, label: 'Chimney smoke fades' },
    { id: 'window', x: 238, y: 205, r: 22, label: 'Window goes dark' },
    { id: 'cat', x: 452, y: 302, r: 24, label: 'The fence cat leaves' },
    { id: 'flower', x: 322, y: 378, r: 18, label: 'A flower changes colour' },
  ],
  harbour: [
    { id: 'beam', x: 112, y: 92, r: 28, label: 'Lighthouse beam off' },
    { id: 'gull', x: 185, y: 68, r: 20, label: 'A gull flies away' },
    { id: 'sail', x: 305, y: 152, r: 30, label: 'The sail turns red' },
    { id: 'flag', x: 92, y: 52, r: 18, label: 'Flag points the other way' },
    { id: 'fish', x: 420, y: 330, r: 20, label: 'The jumping fish is gone' },
    { id: 'buoy', x: 482, y: 382, r: 18, label: 'Buoy changes colour' },
    { id: 'porthole', x: 268, y: 268, r: 15, label: 'A porthole goes dark' },
    { id: 'anchor', x: 520, y: 408, r: 20, label: 'Anchor disappears' },
  ],
  market: [
    { id: 'lantern', x: 92, y: 82, r: 22, label: 'A lantern turns green' },
    { id: 'tassel', x: 252, y: 72, r: 16, label: 'A tassel is missing' },
    { id: 'star', x: 402, y: 122, r: 18, label: 'Sign star changes' },
    { id: 'bulb', x: 202, y: 152, r: 14, label: 'A festoon bulb is out' },
    { id: 'umbrella', x: 332, y: 202, r: 26, label: 'Umbrella changes colour' },
    { id: 'hat', x: 282, y: 262, r: 18, label: 'Vendor hat turns blue' },
    { id: 'cat', x: 482, y: 282, r: 20, label: 'Market cat vanishes' },
    { id: 'crate', x: 152, y: 332, r: 20, label: 'An apple leaves the crate' },
    { id: 'jar', x: 432, y: 362, r: 17, label: 'A jam jar is gone' },
    { id: 'moon', x: 502, y: 62, r: 18, label: 'The moon loses a crater' },
  ],
};

export function totalFor(levelId) {
  return DIFFERENCES[levelId].length;
}

export function remainingFor(levelId, found) {
  return DIFFERENCES[levelId].filter((d) => !found.has(d.id));
}
