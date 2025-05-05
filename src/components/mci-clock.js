import { BaseElement } from "../utils/base-element.js";

class MCIClock extends BaseElement {
    constructor() {
        super();
        this.render();
        this.updateTime();
        this.interval = setInterval(() => this.updateTime(), 1000);
    }

    static get observedAttributes() {
        return ["value", "set-position", "disabled", "bg-color", "text-color", ...BaseElement.observedAttributes];
    }

    _updateAttributes() {
        if (this.hasAttribute("value")) {
            let value = this.getAttribute("value");
            this.timerTitle.textContent = value;
        }
    }

    _applystylesFromAttributes() {
        let bgColor = this.getAttribute("bg-color");
        this.outerElement.style.backgroundColor=bgColor;
        let textColor = this.getAttribute("text-color") || "#ffffff";
        this.timerTitle.style.color = textColor;
        this.timerDisplay.style.color = textColor;
    }

    onAttributeChange(name, oldValue, newValue) {
        if (name === "value") {
            this.timerTitle.textContent = newValue;
        }
        if (name === "disabled") {
            this.toggleDisabledState(newValue !== null);
        }
        this._updateAttributes();
        this._applystylesFromAttributes();
        this.applyStyles();
    }

    toggleDisabledState(isDisabled) {
        if (isDisabled) {
            clearInterval(this.interval); // Stop updating time
            this.timerDisplay.style.opacity = "0.5"; // Make it visually disabled
            this.timerDisplay.style.pointerEvents = "none"; // Prevent interactions
        } else {
            this.interval = setInterval(() => this.updateTime(), 1000); // Restart time update
            this.timerDisplay.style.opacity = "1";
            this.timerDisplay.style.pointerEvents = "auto";
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 10px;
                    box-sizing: border-box;
                    background: ${this.getAttribute('bg-color') };
                    color: var(--text-color, white);
                    padding: 5px;
                }

                h3 {
                    font-size: 16px;
                    margin: 0 0 5px;
                    display: flex;
                    align-items: center;
                }

                .time {
                    font-size: 24px;
                    font-weight: bold;
                }

                :host(:hover) {
                    transform: scale(1.05);
                    box-shadow: 0 10px 12px rgba(136, 134, 134, 0.3);
                }

                :host([disabled]) .time {
                    opacity: 0.5;
                    pointer-events: none;
                }
            </style>
            <div>
                <h3>Mci Clock</h3>
                <div class="time"></div>
            </div>
        `;

        this.outerElement = this.shadowRoot.querySelector("div");
        this.timerTitle = this.shadowRoot.querySelector("h3");
        this.timerDisplay = this.shadowRoot.querySelector(".time");

        // Apply default styles immediately after rendering
        this._applystylesFromAttributes();
    }

    updateTime() {
        if (this.hasAttribute("disabled")) return; // Stop updating if disabled
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        this.timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

customElements.define("mci-clock", MCIClock);
