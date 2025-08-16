class InputManager {
    constructor() {
        this.keys = {};
        this.mouse = {x: 0, y: 0, down: false};
        this.listeners = [];
        this.init();
    }
    init() {
        window.addEventListener('keydown', e => {
            this.keys[e.code] = true;
            this.notify('keydown', e);
        });
        window.addEventListener('keyup', e => {
            this.keys[e.code] = false;
            this.notify('keyup', e);
        });
        window.addEventListener('mousedown', e => {
            this.mouse.down = true;
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.notify('mousedown', e);
        });
        window.addEventListener('mouseup', e => {
            this.mouse.down = false;
            this.notify('mouseup', e);
        });
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.notify('mousemove', e);
        });
    }
    addListener(fn) {
        this.listeners.push(fn);
    }
    notify(event, e) {
        for (const fn of this.listeners) fn(event, e, this);
    }
    isKeyDown(code) {
        return !!this.keys[code];
    }
    clear() {
        this.keys = {};
        this.mouse = {x:0, y:0, down:false};
    }
}
window.InputManager = InputManager;