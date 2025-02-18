import { BaseElement } from "../utils/base-element.js";

class MCIClock extends BaseElement {
    constructor() {
        super();
        this.render();
        this.updateTime();
        this.interval = setInterval(() => this.updateTime(), 1000);
    }

    static get observedAttributes() {
        return ["value", "set-position", ...BaseElement.observedAttributes];
    }

    _updateAttributes() {
        if (this.hasAttribute("value")) {
            let value = this.getAttribute("value");
            this.timerTitle.textContent = value;
        }
    }

    _applystylesFromAttributes() {
        if (this.hasAttribute("text-color")) {
            let text_color = this.getAttribute("text-color");
            this.timerDisplay.style.color = text_color;
        }
    }

    onAttributeChange(name, oldValue, newValue) {
        if (name === "value") {
            this.timerTitle.textContent = newValue;
        }
        this._updateAttributes();
        this._applystylesFromAttributes();
        this.applyStyles();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: inherit;
                    box-sizing: border-box;
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
                    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.3);
                }
            </style>
            <div>
                <h3></h3>
                <div class="time"></div>
            </div>
        `;

        this.outerElement = this.shadowRoot.querySelector("div");
        this.timerTitle = this.shadowRoot.querySelector("h3");
        this.timerDisplay = this.shadowRoot.querySelector(".time");
    }

    updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        this.timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

customElements.define("mci-clock", MCIClock);
