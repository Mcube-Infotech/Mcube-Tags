// src/utils/base-element.js
import { getAttr, setAttr, removeAttr, emitEvent, attachShadow } from "./common-functions.js";

export class BaseElement extends HTMLElement {
    constructor() {
        super();
        this.shadow = attachShadow(this, this.styles || "");
        if (typeof this.init === "function") {
            this.init();
        }
    }

    static get observedAttributes() {
        return [
            "width", "height", "style", "value", "status", "bg-color", "text-color",
            "padding", "border", "border-radius", "set-position", "disabled", "hide",
            "text-size", "size"
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.onAttributeChange(name, newValue);
        }
    }

    connectedCallback() {
        this.applyStyles();
    }

    applyStyles() {
        const styles = {
            width: getAttr(this, "width", "auto"),
            height: getAttr(this, "height", "auto"),
            backgroundColor: getAttr(this, "bg-color", "transparent"),
            color: getAttr(this, "text-color", "#000"),
            padding: getAttr(this, "padding", "5px"),
            border: getAttr(this, "border", "none"),
            borderRadius: getAttr(this, "border-radius", "5px"),
            display: getAttr(this, "hide", "false") === "true" ? "none" : "block",
            position: "absolute",
            ...this.getPositionStyles(getAttr(this, "set-position", "top left"))
        };

        Object.assign(this.style, styles);
    }

    getStatusColor() {
        const status = getAttr(this, "status", "primary");
        const statusColors = {
            primary: "#007bff",
            secondary: "#6c757d",
            success: "#28a745",
            danger: "#dc3545",
            warning: "#ffc107",
            info: "#17a2b8",
            light: "#f8f9fa",
            dark: "#343a40"
        };
        return statusColors[status] || "#007bff";
    }

    getPositionStyles(position) {
        const [vertical, horizontal] = position.split(" ");
        return {
            top: vertical === "top" ? "30px" : vertical === "middle" ? "50%" : "auto",
            bottom: vertical === "bottom" ? "0" : "auto",
            left: horizontal === "left" ? "0" : horizontal === "center" ? "50%" : "auto",
            right: horizontal === "right" ? "0" : "auto",
            transform: vertical === "middle" || horizontal === "center" ? "translate(-50%, -50%)" : "none"
        };
    }
 show() {
        console.log("Show called on", this);
        this.removeAttribute("hide");
    }

    hide() {
        console.log("Hide called on", this);
        this.setAttribute("hide", "true");
    }

    enable() {
        console.log("Enable called on", this);
        this.removeAttribute("disabled");
    }

    disable() {
        console.log("Disable called on", this);
        this.setAttribute("disabled", "true");
    }

    addClass(className) {
        this.classList.add(className);
    }

    removeClass(className) {
        this.classList.remove(className);
    }

    toggleClass(className) {
        this.classList.toggle(className);
    }

    reset() {
        this.applyStyles && this.applyStyles();
    }

    onAttributeChange(name, value) {
        this.applyStyles();
    }
}
