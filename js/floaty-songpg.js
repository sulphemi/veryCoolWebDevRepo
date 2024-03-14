const bg_elems = [];
let bg_div;

function randF(lower, upper) { return Math.random() * (upper - lower) + lower; }
function randInt(lower, upper) { return Math.floor(randF(upper, lower)); }
function randC() { return "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"[randInt(0, 52)]; }

class floatingLetter {
    constructor() {
        bg_elems.push(this);

        this.xpos = 0;
        this.ypos = 0;
        this.min_v = randF(0.1, 0.75);
        this.yvel = randF(0.5, 2);
        this.friction = randF(1.05, 1.1);
        this.influence = randF(0.02, 0.05);

        this.gotoRandom();
        this.initDOMElement();
    }

    initDOMElement() {
        this.DOM_elem = document.createElement("span");
        this.DOM_elem.textContent = randC();
        this.DOM_elem.classList.add("floater");
        this.DOM_elem.style.fontSize = randInt(15, 40);

        // opacity scales based on distance from passage
        let opacity;
        if (this.xpos > 900) {
            opacity = randF(0.3, 0.9);
        } else if (this.xpos > 600) {
            opacity = randF(0.2, 0.4);
        } else {
            opacity = randF(0.1, 0.2);
        }
        this.DOM_elem.style.opacity = opacity;
        // 350px from left marks center of <main>
        // this.DOM_elem.style.opacity = (1 - Math.abs(this.x - 350) / window.innerWidth) * 100 + '%';
        bg_div.appendChild(this.DOM_elem);
    }

    tick() {
        // apply force
        if ((this.yvel /= this.friction) < this.min_v) {
            this.yvel = this.min_v;
        }

        // apply velocity
        if ((this.ypos -= this.yvel) < -60) {
            this.ypos = window.innerHeight;
        }

        // apply position
        this.DOM_elem.style.top = this.ypos;
        this.DOM_elem.style.left = this.xpos;
    }

    gotoRandom() {
        // goes to a random position on webpage,
        // used for symbols that appear when first loading webpage
        this.xpos = randInt(0, window.innerWidth);
        this.ypos = randInt(0, window.innerHeight);
    }

    selfDestruct() {
        bg_elems.splice(bg_elems.indexOf(this), 1); // hurr hurr linear runtime bad -- dsa nerd, probably
    }
}

function updateAll() {
    for (const x of bg_elems) x.tick();
    requestAnimationFrame(updateAll);
}

function makeSymbols() {
    // add symbols to the background
    let ct = window.innerWidth / 20; // how many to add
    for (let i = 0; i < ct; i++) {
        new floatingLetter();
    }
    updateAll();
}

function mouseScroll(event) {
    for (const x of bg_elems) {
        x.yvel += event.deltaY * x.influence;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    bg_div = document.getElementById("background");
    makeSymbols();
    document.addEventListener("wheel", mouseScroll);
});