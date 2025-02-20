export function reset() {
    console.log("Reset function called on", this);
    if (typeof this.applyStyles === "function") {
        this.applyStyles();
    } else {
        console.error("applyStyles() method is missing in", this);
    }
}


export function disable() {
    console.log("Disable function called on", this);
    this.setAttribute("disabled", "true");
    this.style.pointerEvents = "none";
    this.style.opacity = "0.5";
}

export function enable() {
    console.log("Enable function called on", this);
    this.removeAttribute("disabled");
    this.style.pointerEvents = "auto";
    this.style.opacity = "1";
}

export function show() {
    console.log("Show function called on", this);
    this.removeAttribute("hide");
}

export function hide() {
    console.log("Hide function called on", this);
    this.setAttribute("hide", "true");
    this.style.display = "none";
}

export function addClass(className) {
    console.log(`Adding class ${className} to`, this);
    this.classList.add(className);
}

export function removeClass(className) {
    console.log(`Removing class ${className} from`, this);
    this.classList.remove(className);
}

export function toggleClass(className) {
    console.log(`Toggling class ${className} on`, this);
    this.classList.toggle(className);
}
