import { getAttr, setAttr, removeAttr, emitEvent, attachShadow } from "./base-functions.js";
import * as CommonFunctions from "./common_function.js";

export class BaseElement extends HTMLElement {
    constructor() {
        super();
        Object.assign(this, CommonFunctions); // Assign common functions

        // // // Explicitly bind functions to ensure they have the correct `this`
        // // Object.entries(CommonFunctions).forEach(([name, fn]) => {
        // //     this[name] = fn.bind(this);
        // });

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
        const sizeMapping = {
            "small": "12px",
            "large": "20px",
            "smaller": "smaller",
            "larger": "larger",
            "x-small": "10px",
            "x-large": "24px",
            "xx-small": "8px",
            "xx-large": "32px",
            "medium": "16px"
        };

        const styles = {
            width: getAttr(this, "width", "auto"),
            height: getAttr(this, "height", "auto"),
            backgroundColor: getAttr(this, "bg-color", "#fffff"),
            color: getAttr(this, "text-color", "white"),
            padding: getAttr(this, "padding", "5px"),
            border: getAttr(this, "border", "none"),
            borderRadius: getAttr(this, "border-radius", "8px"),
            fontSize: sizeMapping[getAttr(this, "size", "medium")], // Apply size mapping
            display: this.hasAttribute("hide") ? "none" : "block", 
            position: "absolute",
            ...this.getPositionStyles(getAttr(this, "set-position", ""))
        };
    
        Object.assign(this.style, styles);
    }

    getStatusColor() {
        const status = getAttr(this, "status", "secondary");
        const statusColors = {
            primary: "#007bff",
            secondary: "#373737",
            success: "#28a745",
            danger: "#dc3545",
            warning: "#ffc107",
            info: "#17a2b8",
            light: "#f8f9fa",
            dark: "#343a40"
        };
        return statusColors[status] || "#373737";
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

    onAttributeChange(name, value) {
        this.applyStyles();
    }
}
