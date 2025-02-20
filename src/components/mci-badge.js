import { BaseElement } from "../utils/base-element.js";

export class BadgeElement extends BaseElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, "value"];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const bgColor = this.getStatusColor();
        this.shadow.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    text-align: center;
                    padding: 6px 12px;
                    white-space: nowrap;
                    border-radius: 12px;
                    background: var(--badge-bg, ${this.getStatusColor()}) !important;
                    color: var(--badge-text, #fff);
                    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease-in-out;
                }

                :host(:hover) {
                    transform: scale(1.05);
                    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
                }
            </style>
            <span>${this.getAttribute("value") || "Badge"}</span>
        `;
        this.applyStyles();
    }

    onAttributeChange(name, value) {
        if (name === "value") {
            const span = this.shadow.querySelector("span");
            if (span) span.textContent = value;
        }
        if (name === "status" || name.startsWith("bg") || name.startsWith("text")) {
            this.render();
        }
        this.applyStyles();
    }
    disable() {
        super.disable();
        this.style.color = "gray"; 
    }
}

customElements.define("mci-badge", BadgeElement);
