import { BaseElement } from "../utils/base-element.js";

export class MCIEmailBox extends BaseElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return [
            ...BaseElement.observedAttributes,
            "padding",
            "placeholder",
            "value",
            "disabled",
            "valid-ui",
            "text-color",
            "text-size",
            "border-radius",
            "bg-color",
            "border"
        ];
    }
    _applyStylesFromAttributes() {
        if (!this.inputElement) return;

        this.inputElement.style.backgroundColor = this.getAttribute("bg-color") || "#373737";
        this.inputElement.style.color = this.getAttribute("text-color") || "white";
        this.inputElement.style.width = this.getAttribute("width") || "auto";
        this.inputElement.style.fontSize = this.getAttribute("text-size") || "16px";
        this.inputElement.style.borderRadius = this.getAttribute("border-radius") || "0px";
        this.inputElement.style.border = "none"; // Remove extra border

    }


    connectedCallback() {
        this.render();
        this.inputElement = this.shadow.querySelector("input");
        this.iconElement = this.shadow.querySelector(".icon-box");
        this.checkIcon = this.shadow.querySelector(".icon-check");
        this.crossIcon = this.shadow.querySelector(".icon-cross");
        this.addEventListeners();
        this.inputElement.value = this.getAttribute("value") || "";
        this._applyStylesFromAttributes();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    font-family: Arial, sans-serif;
                    width: var(--width, 100%);
                }
               .input-container {
                    display: flex;
                    align-items: center;
                    width: auto;
                    background: var(--bg-color);
                    border-radius: var(--border-radius, 6px);
                    position: relative;
                   }

               input {
                   flex: 1;
                   border: none;
                   outline: none;
                   font-size: var(--text-size, 16px);
                   color: var(--text-color, white);
                   background: inherit; /* Inherit from parent */
                }

                input:disabled {
                    background: #f0f0f0;
                }
                .icon-box {
                    display: flex;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    justify-content: center;
                    align-items: center;
                    background: lightgray;
                    margin-left: auto;
                    visibility: hidden; /* Initially hidden */
                }
                .icon-check,
                .icon-cross {
                    width: 16px;
                    height: 16px;
                    display: none;
                }
                .valid .icon-check {
                    display: block;
                    fill: green;
                }
                .invalid .icon-cross {
                    display: block;
                    fill: red;
                }
                .valid, .invalid {
                    visibility: visible;
                }
            </style>

            <div class="input-container">
                <input type="email" placeholder="${this.getAttribute("placeholder") || "Enter email"}" />
                <div class="icon-box">
                    <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                    </svg>
                    <svg class="icon-cross" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
            </div>
        `;
    }

    onAttributeChange(name, value) {
        super.onAttributeChange(name, value);
        if (name === "value" && this.inputElement) {
            this.inputElement.value = value;
            this.validateEmail();
        }
        if (name === "disabled") {
            this.inputElement.disabled = value !== null;
        }
        this._applyStylesFromAttributes();
    }

    addEventListeners() {
        this.inputElement.addEventListener("input", () => {
            this.setAttribute("value", this.inputElement.value);
            this.validateEmail();
        });
    }

    validateEmail() {
        const validUI = this.getAttribute("valid-ui") !== "false";
    
        if (!validUI) {
            this.iconElement.style.visibility = "hidden";
            return;
        }
    
        const email = this.inputElement.value.trim();
        const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const hasUppercase = /[A-Z]/.test(email); // Check for uppercase letters
    
        if (!email) {
            this.hideIcons();
            return;
        }
    
        if (!isValidFormat || hasUppercase) { // Mark invalid if format is wrong or has uppercase
            this.showInvalid();
            return;
        }
    
        this.showValid();
    }
    

    showValid() {
        this.iconElement.classList.remove("invalid");
        this.iconElement.classList.add("valid");
        this.iconElement.style.visibility = "visible";
        this.checkIcon.style.display = "block";
        this.crossIcon.style.display = "none";
    }

    showInvalid() {
        this.iconElement.classList.remove("valid");
        this.iconElement.classList.add("invalid");
        this.iconElement.style.visibility = "visible";
        this.checkIcon.style.display = "none";
        this.crossIcon.style.display = "block";
    }

    hideIcons() {
        this.iconElement.classList.remove("valid", "invalid");
        this.iconElement.style.visibility = "hidden";
        this.checkIcon.style.display = "none";
        this.crossIcon.style.display = "none";
    }
}

customElements.define("mci-email-box", MCIEmailBox);
