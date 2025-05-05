import { BaseElement } from "../utils/base-element.js";

export class HelpTextElement extends BaseElement {
    constructor() {
        super();
        this.targetInput = null;
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, 'text-size', 'text-color']
    }
    _applyStylesFromAttributes() {
        if (this.hasAttribute("text-size")) {
            let textSize = this.getAttribute("text-size")
            this.style.fontSize = textSize
        }
        if (this.hasAttribute("text-color")) {
            let textColor = this.getAttribute("text-color")
            this.style.color = textColor
        }
    }

    connectedCallback() {
        this.render();
        this.observeForTarget(); // Start observing for the target input
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                :host {
                    display: block; /* Always visible */
                    font-size: 12px;
                    color: gray; /* Default text color */
                    border-radius: 4px;
                    z-index: 1000;
                }
                span {
                    display: inline-block;
                }
            </style>
            <span>${this.getAttribute('value') || "Enter your input"}</span> 
        `;
    }

    onAttributeChange(name, oldValue, newValue) {
        if (name === 'value') {
            const span = this.shadowRoot.querySelector('span');
            if (span) {
                span.textContent = newValue || "Enter your input";
            }
        }
        this._applyStylesFromAttributes();
    }

    observeForTarget() {
        const targetId = this.getAttribute("for");
        if (!targetId) return; // Nothing to observe if 'for' is not set

        const checkTarget = () => {
            this.targetInput = document.getElementById(targetId);
            if (this.targetInput) {
                this.positionHelpText(); // Set initial position once the input is found
                observer.disconnect(); // Stop observing once found
            }
        };

        // Check immediately in case the element is already there
        checkTarget();

        // Create a MutationObserver to watch for changes to the DOM
        const observer = new MutationObserver(checkTarget);
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

customElements.define("mci-help-text", HelpTextElement);
