class Upgrade {
    constructor(id, title, desc, branch, character) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.branch = branch;
        this.character = character;
        this.unlocked = false;
    }
}
window.Upgrade = Upgrade;