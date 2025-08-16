class UpgradeTree {
    constructor(characterId, upgrades, unlocked, onSelect) {
        this.characterId = characterId;
        this.upgrades = upgrades;
        this.unlocked = unlocked;
        this.onSelect = onSelect;
        this.dom = document.createElement('div');
        this.dom.className = 'upgrade-panel';
        this.render();
        document.getElementById('ui-overlay').appendChild(this.dom);
    }
    render() {
        this.dom.innerHTML = `<h2>Upgrade Tree</h2>`;
        let branches = {};
        for (const up of this.upgrades) {
            if (!branches[up.branch]) branches[up.branch] = [];
            branches[up.branch].push(up);
        }
        for (const branch in branches) {
            const branchDiv = document.createElement('div');
            branchDiv.className = 'upgrade-branch';
            for (const up of branches[branch]) {
                const node = document.createElement('div');
                node.className = 'upgrade-node' + (this.unlocked.includes(up.id) ? ' selected' : '');
                node.innerHTML = `<strong>${up.title}</strong><br><span>${up.desc}</span>`;
                if (this.unlocked.includes(up.id)) {
                    node.classList.add('locked');
                } else {
                    node.onclick = () => this.onSelect(up.id);
                }
                branchDiv.appendChild(node);
            }
            this.dom.appendChild(branchDiv);
        }
        this.dom.innerHTML += `<button onclick="this.parentNode.style.display='none'">Close</button>`;
    }
    hide() {
        this.dom.style.display = 'none';
    }
    destroy() {
        if (this.dom && this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
    }
}
window.UpgradeTree = UpgradeTree;