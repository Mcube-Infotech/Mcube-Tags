import { BaseElement } from "../utils/base-element.js";

export class AlertElement extends BaseElement {
    constructor() {
        super();
        this.timeout = null;
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, "value", "dismissible", "auto-close", "width", "height", "padding"];
    }

    _applyStylesFromAttributes() {
        if (this.hasAttribute("width")) {
            let width = this.getAttribute("width");
            this.style.width = width;
        }
        if (this.hasAttribute("height")) {
            let height = this.getAttribute("height");
            this.style.height = height;
        }
        if (this.hasAttribute("padding")) {
            let padding = this.getAttribute("padding");
            this.style.padding = padding;
        }
    }

    startAutoClose() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        const attr = this.getAttribute("auto-close");
        let duration = 3000;
        if (attr && !isNaN(parseInt(attr))) {
            duration = parseInt(attr);
        }

        this.timeout = setTimeout(() => {
            this.classList.add("hide");

            // Wait for transition before removing
            setTimeout(() => {
                this.remove(); // Or call this.hide() if you prefer reusable behavior
            }, 600); // Should match CSS transition duration
        }, duration);
    }

    connectedCallback() {
        this.render();
        this.show();
        if (this.hasAttribute("auto-close")) {
            this.startAutoClose();
        }
    }

    render() {
        const bgColor = this.getStatusColor() || "#373737";
        const isDismissible = this.hasAttribute("dismissible");
        const hasAutoClose = this.hasAttribute("auto-close");
        const closeButton = isDismissible ? `<button class="close-btn">&times;</button>` : "";

        this.shadow.innerHTML = `
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    padding: 12px 16px;
                    border-radius: 12px;
                    background: var(--alert-bg, ${bgColor}) !important;
                    color: var(--alert-text, #fff);
                    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
                    ${this.getPositionStyle()}
                    opacity: 1;
                    transform: translateY(0);
                    ${hasAutoClose ? "transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;" : ""}
                }

                :host(.hide) {
                    opacity: 0;
                    transform: translateY(-10px);
                }

                .close-btn {
                    background: none;
                    border: none;
                    font-size: 18px;
                    font-weight: bold;
                    color: inherit;
                    cursor: pointer;
                    margin-left: 10px;
                }

                .close-btn:hover {
                    opacity: 0.7;
                }
            </style>
            <span>${this.getAttribute("value") || "Alert message"}</span>
            ${closeButton}
        `;

        if (isDismissible) {
            this.shadow.querySelector(".close-btn").addEventListener("click", () => this.hide());
        }
    }

    getPositionStyle() {
        const position = this.getAttribute("set-position") || "top left";
        const styles = this.getPositionStyles(position); // from BaseElement
        return Object.entries(styles)
            .map(([key, value]) => `${key}: ${value};`)
            .join(" ");
    }

    onAttributeChange(name, value) {
        if (name === "value") {
            const span = this.shadow.querySelector("span");
            if (span) span.textContent = value;
        }

        if (["dismissible", "auto-close"].includes(name)) {
            this.render();
        }

        if (name === "auto-close") {
            this.startAutoClose();
        }

        this._applyStylesFromAttributes();
    }



    // disable() {
    //     super.disable();
    //     const closeBtn = this.shadowRoot.querySelector(".close-btn");
    //     if (closeBtn) {
    //         closeBtn.style.pointerEvents = "none";
    //         closeBtn.style.opacity = "0.5";
    //     }
    // }

    // enable() {
    //     super.enable();
    //     const closeBtn = this.shadowRoot.querySelector(".close-btn");
    //     if (closeBtn) {
    //         closeBtn.style.pointerEvents = "auto";
    //         closeBtn.style.opacity = "1";
    //     }
    // }
}

customElements.define("mci-alert", AlertElement);
