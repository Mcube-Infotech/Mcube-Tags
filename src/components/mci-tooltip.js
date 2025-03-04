import { BaseElement } from "../utils/base-element.js";

export class MCIToolTip extends BaseElement {
    constructor() {
        super();
        this.targetElement = null;
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, "value", "tooltip-direction", "text-size", "text-color", "bg-color", "border-radius", "padding", "for"];
    }

    _applyStylesFromAttributes() {
        if (this.hasAttribute("width")) {
            let width = this.getAttribute("width");
            this.style.width = width
        }

        if (this.hasAttribute("height")) {
            let height = this.getAttribute("height");
            this.style.height = height
        }

        if (this.hasAttribute("padding")) {
            let padding = this.getAttribute("padding");
            this.style.padding = padding
        }

        if (this.hasAttribute("text-size")) {
            let textSize = this.getAttribute("padding");
            this.style.fontSize = textSize
        }

        if (this.hasAttribute("text-color")) {
            let textColor = this.getAttribute("text-color");
            this.style.color = textColor
        }

        if (this.hasAttribute("bg-color")) {
            let bgColor = this.getAttribute("bg-color");
            this.style.backgroundColor = bgColor
        }

        if (this.hasAttribute("border-radius")) {
            let borderRadius = this.getAttribute("border-radius");
            this.style.borderRadius = borderRadius
        }
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                :host {
                    position: absolute;
                    display: none;
                    background: var(--tooltip-bg, ${this.getAttribute("bg-color") || "#373737"});
                    color: var(--tooltip-text, ${this.getAttribute("text-color") || "white"});
                    padding: ${this.getAttribute("padding") || "5px 10px"};
                    border-radius: ${this.getAttribute("border-radius") || "4px"};
                    font-size: ${this.getAttribute("font-size") || "12px"};
                    white-space: nowrap;
                    z-index: 1000;
                    transition: opacity 0.3s ease-in-out;
                    opacity: 0;
                }

                .tooltip-arrow {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-style: solid;
                }

                /* Tooltip Arrow Styles */
                :host([tooltip-direction="top"]) .tooltip-arrow {
                    bottom: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 5px 5px 0 5px;
                    border-color: black transparent transparent transparent;
                }

                :host([tooltip-direction="bottom"]) .tooltip-arrow {
                    top: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 0 5px 5px 5px;
                    border-color: transparent transparent black transparent;
                }

                :host([tooltip-direction="left"]) .tooltip-arrow {
                    right: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-width: 5px 0 5px 5px;
                    border-color: transparent transparent transparent black;
                }

                :host([tooltip-direction="right"]) .tooltip-arrow {
                    left: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-width: 5px 5px 5px 0;
                    border-color: transparent black transparent transparent;
                }
            </style>
            <span class="tooltip-text">${this.getAttribute("value") || "Tooltip"}</span>
            <div class="tooltip-arrow"></div>
        `;

        this.textElement = this.shadow.querySelector(".tooltip-text");
        this.arrowElement = this.shadow.querySelector(".tooltip-arrow");
    }

    attachEventListeners() {
        const targetId = this.getAttribute("for");
        this.targetElement = document.getElementById(targetId);

        if (this.targetElement) {
            this.targetElement.addEventListener("mouseenter", () => this.showTooltip());
            this.targetElement.addEventListener("mouseleave", () => this.hideTooltip());
        }
    }

    showTooltip() {
        this.updatePosition();
        this.style.display = "block";
        setTimeout(() => { this.style.opacity = "1"; }, 10);
    }

    hideTooltip() {
        this.style.opacity = "0";
        setTimeout(() => { this.style.display = "none"; }, 300);
    }

    updatePosition() {
        if (!this.targetElement) return;

        const rect = this.targetElement.getBoundingClientRect();
        const tooltipDirection = this.getAttribute("tooltip-direction") || "top";

        // Make tooltip visible temporarily for accurate measurement
        this.style.visibility = "hidden";
        this.style.display = "block";
        const tooltipRect = this.getBoundingClientRect();
        this.style.visibility = "visible";

        let top, left;
        switch (tooltipDirection) {
            case "top":
                top = rect.top - tooltipRect.height - 8 + window.scrollY;
                left = rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX;
                break;
            case "bottom":
                top = rect.bottom + 8 + window.scrollY;
                left = rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX;
                break;
            case "left":
                top = rect.top + rect.height / 2 - tooltipRect.height / 2 + window.scrollY;
                left = rect.left - tooltipRect.width - 8 + window.scrollX;
                break;
            case "right":
                top = rect.top + rect.height / 2 - tooltipRect.height / 2 + window.scrollY;
                left = rect.right + 8 + window.scrollX;
                break;
        }

        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
            opacity: "1"
        });
    }

    onAttributeChange(name, value) {
        if (name === "value" && this.textElement) {
            this.textElement.textContent = value || "Tooltip";
        }
        if (name === "tooltip-direction") {
            this.updatePosition();
        }
        this._applyStylesFromAttributes();
    }
    disable() {
        super.disable();
        this.style.color = "gray"; // Change text color
    }
    enable() {
        super.enable();
        this.style.color = this.getAttribute("text-color") || "black";
    }
}

customElements.define("mci-tool-tip", MCIToolTip);
