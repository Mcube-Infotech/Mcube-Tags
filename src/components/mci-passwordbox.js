import { BaseElement } from "../utils/base-element.js"; // Ensure correct import path

export class MCIPasswordBox extends BaseElement {
    constructor() {
        super();
        this.inputElement = null;
        this.toggleIcon = null;
        this.errorMessage = null;

        this.getEyeIcon = this.getEyeIcon.bind(this);
        this.getEyeSlashIcon = this.getEyeSlashIcon.bind(this);
    }

    static get observedAttributes() {
        return [
            ...BaseElement.observedAttributes,
            "padding", "placeholder", "value", "disabled", "icon-ui",
            "text-color", "text-size", "border-radius", "bg-color",
            "border", "characters", "number", "symbol", "uppercase",
            "min-length", "max-length","disabled", "width"
        ];
    }

    _applyStylesFromAttributes() {
        if (!this.inputElement) return;

        this.inputElement.style.backgroundColor = this.getAttribute("bg-color") || "#373737";
        this.inputElement.style.color = this.getAttribute("text-color") || "white";
        this.inputElement.style.width = this.getAttribute("width") || "auto";
        this.inputElement.style.fontSize = this.getAttribute("text-size") || "16px";
        this.inputElement.style.borderRadius = this.getAttribute("border-radius") || "0px";
        this.inputElement.style.border = "none";

        // Adjust icon color based on background
        if (this.toggleIcon) {
            const bgColor = this.getAttribute("bg-color") || "black";
            this.toggleIcon.style.color = bgColor.toLowerCase() === "black" ? "white" : "black";
        }
    }

    connectedCallback() {
        if (!this.shadowRoot) return;
        this.render();
        this.cacheElements();
        this.applyBaseStyles();
        this.addEventListeners();
        this.updateIconVisibility();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === "icon-ui") {
            this.updateIconVisibility();
        }
        if (oldValue !== newValue) {
            this.applyBaseStyles();
        }
        if (name === "disabled") {
            this.inputElement.disabled = newValue !== null;
        }
    }

    updateIconVisibility() {
        if (this.toggleIcon) {
            const iconVisible = this.getAttribute("icon-ui") !== "false";
            this.toggleIcon.style.display = iconVisible ? "flex" : "none";
        }
    }

    cacheElements() {
        this.inputElement = this.shadowRoot.querySelector("input");
        this.toggleIcon = this.shadowRoot.querySelector(".toggle-icon");
        this.errorMessage = this.shadowRoot.querySelector(".error-message");

        if (!this.inputElement || !this.toggleIcon || !this.errorMessage) {
            console.error("MCIPasswordBox: Elements not found. Check rendering.");
        }
    }

    applyBaseStyles() {
        if (typeof this._applyStylesFromAttributes === "function") {
            this._applyStylesFromAttributes();
        }

        if (this.errorMessage) {
            const width = this.getAttribute("width") || "200px";
            this.errorMessage.style.maxWidth = width;
        }
    }

    addEventListeners() {
        if (!this.toggleIcon || !this.inputElement) return;

        this.toggleIcon.addEventListener("click", () => {
            if (this.inputElement.type === "password") {
                this.inputElement.type = "text";
                this.toggleIcon.innerHTML = this.getEyeIcon();
            } else {
                this.inputElement.type = "password";
                this.toggleIcon.innerHTML = this.getEyeSlashIcon();
            }
        });

        this.inputElement.addEventListener("input", () => this.validateInput());
    }

    validateInput() {
        if (!this.inputElement || !this.errorMessage) return;

        const value = this.inputElement.value;
        let errors = [];

        if (this.hasAttribute("min-length") && value.length < parseInt(this.getAttribute("min-length"))) {
            errors.push(`Minimum length is ${this.getAttribute("min-length")} characters.`);
        }
        if (this.hasAttribute("max-length") && value.length > parseInt(this.getAttribute("max-length"))) {
            errors.push(`Maximum length is ${this.getAttribute("max-length")} characters.`);
        }
        if (this.hasAttribute("characters") && value.length !== parseInt(this.getAttribute("characters"))) {
            errors.push(`Password must be exactly ${this.getAttribute("characters")} characters.`);
        }
        if (this.hasAttribute("number") && (value.match(/[0-9]/g) || []).length !== parseInt(this.getAttribute("number"))) {
            errors.push(`Password must contain exactly ${this.getAttribute("number")} numeric characters.`);
        }
        if (this.hasAttribute("symbol") && (value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length !== parseInt(this.getAttribute("symbol"))) {
            errors.push(`Password must contain exactly ${this.getAttribute("symbol")} special characters.`);
        }
        if (this.hasAttribute("uppercase") && (value.match(/[A-Z]/g) || []).length !== parseInt(this.getAttribute("uppercase"))) {
            errors.push(`Password must contain exactly ${this.getAttribute("uppercase")} uppercase letters.`);
        }

        this.errorMessage.textContent = errors.length ? errors.join(" ") : "";
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    font-family: Arial, sans-serif;
                    width: var(--width, 300px);
                    background: transparent !important;
                }
                .input-container {
                    display: flex;
                    align-items: center;
                    width: auto;
                    max-width: auto;
                    background: var(--bg-color, white);
                    border: var(--border, 1px solid black);
                    border-radius: var(--border-radius, 6px);
                    position: relative;
                    box-sizing: border-box;
                }
                input {
                    flex: 1;
                    padding: 8px;
                    border: none;
                    outline: none;
                    font-size: var(--text-size, 16px);
                    color: var(--text-color, black);
                    background: transparent;
                    width: auto;
                    box-sizing: border-box;
                }
                input:disabled {
                    background: #f0f0f0;
                }
                .toggle-icon {
                    cursor: pointer;
                    position: absolute;
                    right: 10px;
                    display: flex;
                    align-items: center;
                    color: var(--icon-color, black);
                }
                .toggle-icon svg {
                    width: 20px;
                    height: 20px;
                }
                .error-message {
                    color: red;
                    font-size: 12px;
                    margin-top: 5px;
                    word-wrap: break-word;
                    max-width: 200px; /* Default; overridden in JS */
                }
            </style>

            <div class="input-container">
                <input type="password" placeholder="${this.getAttribute("placeholder") || "Enter password"}" />
                <span class="toggle-icon">
                    ${this.getEyeSlashIcon()}
                </span>
            </div>
            <div class="error-message"></div>
        `;

        this.updateIconVisibility();
    }

    getEyeIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
               <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
               <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                </svg>`;
    }

    getEyeSlashIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
               <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
               <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                </svg>`;
    }
}

customElements.define("mci-password-box", MCIPasswordBox);
