import { BaseElement } from "../utils/base-element.js";

export class MciButton extends BaseElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, "variant", "text", "hover-effect", "transition", "bg-color", "text-color"];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const text = this.getAttribute("text") || "Click Me";
        const variant = this.getAttribute("variant") || "normal";
        const bgColor = this.getAttribute("bg-color") || "#007bff";
        const textColor = this.getAttribute("text-color") || "#fff";
        const padding = this.getAttribute("padding") || "10px 20px";
        const borderRadius = this.getAttribute("border-radius") || "5px";
        const transition = this.getAttribute("transition") || "0.3s";
        const hoverEffect = this.getAttribute("hover-effect") || "none"; // Default: no effect

        let buttonStyles = `
            padding: ${padding};
            border-radius: ${borderRadius};
            cursor: pointer;
            transition: all ${transition} ease-in-out;
            font-size: var(--text-size, 16px);
            border: none;
            outline: none;
        `;

        let hoverStyles = "";
        if (hoverEffect.includes("scale")) {
            hoverStyles += "transform: scale(1.05);"; // Scale-up effect
        }
        if (hoverEffect.includes("shadow")) {
            hoverStyles += "box-shadow: 0px 4px 8px rgba(1, 0, 0, 1);"; // Drop shadow
        }

        if (variant === "outline") {
            buttonStyles += `
                background: transparent !important;
                border: 2px solid ${bgColor} !important;
                color: ${bgColor} !important;
            `;
            hoverStyles += `background: ${bgColor} !important; color: #fff !important;`;
        } else if (variant === "disable") {
            buttonStyles += `
                background: #ccc !important;
                color: #666 !important;
                cursor: not-allowed !important;
                pointer-events: none !important;
            `;
        } else {
            buttonStyles += `background: ${bgColor} !important; color: ${textColor} !important;`;
        }

        this.shadow.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                }
                button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    ${buttonStyles}
                }
                button:hover {
                    ${hoverStyles}
                }
                button:focus,
                button:active {
                    outline: none;
                    box-shadow: none;
                }
            </style>
            <button>${text}</button>
        `;
    }

    onAttributeChange(name) {
        if (["bg-color", "text-color", "variant", "hover-effect"].includes(name)) {
            this.render();
        }
    }
}

customElements.define("mci-button", MciButton);
