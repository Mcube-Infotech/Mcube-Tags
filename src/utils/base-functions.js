// Helper to get an attribute with a fallback
export function getAttr(el, attr, fallback = "") {
    return el.hasAttribute(attr) ? el.getAttribute(attr) : fallback;
}

// Helper to set an attribute
export function setAttr(el, attr, value) {
    el.setAttribute(attr, value);
}

// Helper to remove an attribute
export function removeAttr(el, attr) {
    el.removeAttribute(attr);
}

// Dispatch a custom event from an element
export function emitEvent(el, eventName, detail = {}) {
    el.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true, composed: true }));
}

// Attach Shadow DOM and apply styles
export function attachShadow(el, styles = "") {
    const shadow = el.attachShadow({ mode: "open" });
    if (styles) {
        const style = document.createElement("style");
        style.textContent = styles;
        shadow.appendChild(style);
    }
    return shadow;
}
