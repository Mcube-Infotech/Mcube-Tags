import { BaseElement } from "../utils/base-element.js";

export class ToggleSwitchElement extends BaseElement {
    constructor() {
        super();
        this.checked = this.hasAttribute("checked");
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, "checked", "disabled", "size", "on-label", "off-label"];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const size = this.getAttribute("size") || "medium"; // Default to medium
        const onLabel = this.getAttribute("on-label") || "ON";
        const offLabel = this.getAttribute("off-label") || "OFF";
        const isDisabled = this.hasAttribute("disabled");
        // const checked = this.hasAttribute("checked");

        //'this.checked' is always in sync with the attribute
        this.checked = this.hasAttribute("checked")

        // Define size variations
        const sizes = {
            small: { width: "40px", height: "20px", sliderSize: "14px", moveX: "18px", fontSize: "10px" },
            medium: { width: "60px", height: "34px", sliderSize: "26px", moveX: "26px", fontSize: "12px" },
            large: { width: "80px", height: "44px", sliderSize: "34px", moveX: "36px", fontSize: "14px" },
        };
        const { width, height, sliderSize, moveX, fontSize } = sizes[size] || sizes.medium;

        this.shadow.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                    cursor: ${isDisabled ? "not-allowed" : "pointer"};
                    user-select: none;
                }

                .switch {
                    position: relative;
                    display: inline-block;
                    width: ${width};
                    height: ${height};
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: ${this.checked ? "var(--toggle-on-bg, #2196F3)" : "var(--toggle-off-bg, #ccc)"};
                    transition: .4s;
                    border-radius: ${height};
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: ${sliderSize};
                    width: ${sliderSize};
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                    transform: ${this.checked ? `translateX(${moveX})` : "translateX(0)"};
                }

                .switch-label {
                    font-size: ${fontSize};
                    margin-left: 10px;
                    font-weight: bold;
                    color: ${this.checked ? "var(--toggle-on-text, #2196F3)" : "var(--toggle-off-text, #666)"};
                    text-transform: uppercase;
                }

                :host([disabled]) .switch {
                    opacity: 0.6;
                    pointer-events: none;
                }
            </style>
            
            <label class="switch">
                <input type="checkbox" ${this.checked ? "checked" : ""}>
                <span class="slider"></span>
            </label>
            <span class="switch-label">${this.checked ? onLabel : offLabel}</span>
        `;

        //insert the query selector in innerhtml... 
        this.inputElement = this.shadow.querySelector("input");
        this.labelElement = this.shadow.querySelector(".switch-label");
        this.inputElement.addEventListener("change", () => this.handleToggle());
    }

    //Additionally add one new method handleToggle() and thie method to update the attribute
    handleToggle() {
        this.checked = this.inputElement.checked;

        //Update the attribute to reflect the change
        if (this.checked) {
            this.setAttribute("checked", "");
        } else {
            this.removeAttribute("checked");
        }

        this.labelElement.textContent = this.checked ? this.getAttribute("on-label") || "ON" : this.getAttribute("off-label") || "OFF";
        this.dispatchEvent(new CustomEvent("toggle", { detail: { checked: this.checked } }));
    }

    onAttributeChange(name, value) {
        if (["checked", "disabled", "size", "on-label", "off-label"].includes(name)) {
            this.checked = this.hasAttribute("checked");

            //Add one if conditions to insert inputelement is checked...
            if (this.inputElement) {
                this.inputElement.checked = this.checked;
            }
            this.render();
        }
    }

    toggle() {
        this.checked = !this.checked;

        // FIXED: Properly update attribute
        if (this.checked) {
            this.setAttribute("checked", "");
        } else {
            this.removeAttribute("checked");
        }
    }
}

customElements.define("mci-toggle", ToggleSwitchElement);