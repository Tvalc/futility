const CollisionUtils = {
    rectsOverlap: (a, b) =>
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y,
    pointInRect: (x, y, rect) =>
        x >= rect.x && x <= rect.x + rect.width &&
        y >= rect.y && y <= rect.y + rect.height,
    circleOverlap: (a, b) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < (a.radius + b.radius);
    },
    // Add more collision helpers as needed
};
window.CollisionUtils = CollisionUtils;