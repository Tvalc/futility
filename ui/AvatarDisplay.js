class AvatarDisplay {
    constructor(characterId) {
        this.characterId = characterId;
        this.dom = document.createElement('div');
        this.dom.className = 'avatar-display';
        document.getElementById('ui-overlay').appendChild(this.dom);
        this.render();
    }
    render() {
        // SVG avatar
        if (this.characterId === 'martian') {
            this.dom.innerHTML = `<svg width="60" height="60">
                <ellipse cx="30" cy="26" rx="22" ry="22" fill="#2cf" stroke="#fff" stroke-width="3"/>
                <ellipse cx="30" cy="30" rx="15" ry="12" fill="#fff" fill-opacity="0.7"/>
                <ellipse cx="24" cy="30" rx="3" ry="6" fill="#fff"/>
                <ellipse cx="36" cy="30" rx="3" ry="6" fill="#fff"/>
            </svg>`;
        } else {
            this.dom.innerHTML = `<svg width="60" height="60">
                <ellipse cx="30" cy="24" rx="23" ry="23" fill="#ffe763" stroke="#fff" stroke-width="3"/>
                <ellipse cx="30" cy="27" rx="13" ry="10" fill="#fff" fill-opacity="0.7"/>
                <ellipse cx="25" cy="27" rx="2" ry="5" fill="#fff"/>
                <ellipse cx="35" cy="27" rx="2" ry="5" fill="#fff"/>
            </svg>`;
        }
    }
    setCharacter(characterId) {
        this.characterId = characterId;
        this.render();
    }
    destroy() {
        if (this.dom && this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
    }
}
window.AvatarDisplay = AvatarDisplay;