import { BaseElement } from "../utils/base-element.js";

class MCIRating extends BaseElement {
    constructor() {
        super();
        this.render();
    }

    static get observedAttributes() {
        return ["max", "rating", "width", "height"];
    }

    onAttributeChange(name, oldValue, newValue) {
        if (["rating", "max", "star-color", "width", "height"].includes(name)) {
            this._updateStars();
        }
    }
    _updateStars() {
        const max = parseInt(this.getAttribute("max") || "5");
        const rating = parseFloat(this.getAttribute("rating") || "0");
        const starColor = this.getAttribute("star-color") || "#FFD700"; // Default gold
        const emptyColor = "lightgray"; // Keeps empty stars the same

        this.container.innerHTML = "";

        let fullStars = Math.floor(rating);
        let halfStar = rating % 1 >= 0.5 ? 1 : 0;
        let emptyStars = max - fullStars - halfStar;

        for (let i = 0; i < fullStars; i++) {
            const star = document.createElement("span");
            star.style.backgroundColor = starColor;
            this.container.appendChild(star);
        }

        if (halfStar) {
            const halfStarElement = document.createElement("span");
            halfStarElement.style.background = `linear-gradient(to right, ${starColor} 50%, ${emptyColor} 50%)`;
            this.container.appendChild(halfStarElement);
        }

        for (let i = 0; i < emptyStars; i++) {
            const star = document.createElement("span");
            star.style.backgroundColor = emptyColor;
            this.container.appendChild(star);
        }
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    --star-width: ${this.getAttribute("width") || "20px"};
                    --star-height: ${this.getAttribute("height") || "20px"};
                }

                div {
                    display: flex;
                    gap: 7px;
                }

                span {
                    display: inline-block;
                    width: var(--star-width);
                    height: var(--star-height);
                    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                }
            </style>
            <div></div>
        `;

        this.container = this.shadowRoot.querySelector("div");
        this._updateStars();
    }
    disable() {
        super.disable();
        this.style.pointerEvents = "none"; // Prevent interaction
    }
    enable() {
        super.enable();
        this.style.pointerEvents = "auto";
    }

}

customElements.define("mci-rating", MCIRating);
