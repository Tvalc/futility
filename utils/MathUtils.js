const MathUtils = {
    clamp: (val, min, max) => Math.max(min, Math.min(max, val)),
    lerp: (a, b, t) => a + (b - a) * t,
    randRange: (min, max) => Math.random() * (max - min) + min,
    randInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    angleTo: (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1),
    distance: (x1, y1, x2, y2) =>
        Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)),
    sign: (v) => (v > 0 ? 1 : v < 0 ? -1 : 0),
    // Add more math helpers as needed
};
window.MathUtils = MathUtils;