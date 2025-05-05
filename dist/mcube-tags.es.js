function h(s, t, e = "") {
  return s.hasAttribute(t) ? s.getAttribute(t) : e;
}
function x(s, t = "") {
  const e = s.attachShadow({ mode: "open" });
  if (t) {
    const i = document.createElement("style");
    i.textContent = t, e.appendChild(i);
  }
  return e;
}
function v() {
  console.log("Reset function called on", this), typeof this.applyStyles == "function" ? this.applyStyles() : console.error("applyStyles() method is missing in", this);
}
function w() {
  console.log("Disable function called on", this), this.setAttribute("disabled", "true"), this.style.pointerEvents = "none", this.style.opacity = "0.5";
}
function A() {
  console.log("Enable function called on", this), this.removeAttribute("disabled"), this.style.pointerEvents = "auto", this.style.opacity = "1";
}
function E() {
  console.log("Show function called on", this), this.removeAttribute("hide");
}
function k() {
  console.log("Hide function called on", this), this.setAttribute("hide", "true"), this.style.display = "none";
}
function C(s) {
  console.log(`Adding class ${s} to`, this), this.classList.add(s);
}
function S(s) {
  console.log(`Removing class ${s} from`, this), this.classList.remove(s);
}
function $(s) {
  console.log(`Toggling class ${s} on`, this), this.classList.toggle(s);
}
const I = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClass: C,
  disable: w,
  enable: A,
  hide: k,
  removeClass: S,
  reset: v,
  show: E,
  toggleClass: $
}, Symbol.toStringTag, { value: "Module" }));
class r extends HTMLElement {
  constructor() {
    super(), Object.assign(this, I), this.shadow = x(this, this.styles || ""), typeof this.init == "function" && this.init();
  }
  static get observedAttributes() {
    return [
      "width",
      "height",
      "style",
      "value",
      "status",
      "bg-color",
      "text-color",
      "padding",
      "border",
      "border-radius",
      "set-position",
      "disabled",
      "hide",
      "text-size",
      "size"
    ];
  }
  attributeChangedCallback(t, e, i) {
    e !== i && this.onAttributeChange(t, i);
  }
  connectedCallback() {
    this.applyStyles();
  }
  applyStyles() {
    const t = {
      small: "12px",
      large: "20px",
      smaller: "smaller",
      larger: "larger",
      "x-small": "10px",
      "x-large": "24px",
      "xx-small": "8px",
      "xx-large": "32px",
      medium: "16px"
    }, e = {
      width: h(this, "width", "auto"),
      height: h(this, "height", "auto"),
      backgroundColor: h(this, "bg-color", "#fffff"),
      color: h(this, "text-color", "white"),
      padding: h(this, "padding", "5px"),
      border: h(this, "border", "none"),
      borderRadius: h(this, "border-radius", "8px"),
      fontSize: t[h(this, "size", "medium")],
      // Apply size mapping
      display: this.hasAttribute("hide") ? "none" : "block",
      position: "absolute",
      ...this.getPositionStyles(h(this, "set-position", ""))
    };
    Object.assign(this.style, e);
  }
  getStatusColor() {
    const t = h(this, "status", "secondary");
    return {
      primary: "#007bff",
      secondary: "#373737",
      success: "#28a745",
      danger: "#dc3545",
      warning: "#ffc107",
      info: "#17a2b8",
      light: "#f8f9fa",
      dark: "#343a40"
    }[t] || "#373737";
  }
  getPositionStyles(t) {
    const [e, i] = t.split(" ");
    return {
      top: e === "top" ? "30px" : e === "middle" ? "50%" : "auto",
      bottom: e === "bottom" ? "0" : "auto",
      left: i === "left" ? "0" : i === "center" ? "50%" : "auto",
      right: i === "right" ? "0" : "auto",
      transform: e === "middle" || i === "center" ? "translate(-50%, -50%)" : "none"
    };
  }
  onAttributeChange(t, e) {
    this.applyStyles();
  }
}
class z extends r {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return [...r.observedAttributes, "value"];
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.getStatusColor(), this.shadow.innerHTML = `
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
                    border-radius: 30px;
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
        `, this.applyStyles();
  }
  onAttributeChange(t, e) {
    if (t === "value") {
      const i = this.shadow.querySelector("span");
      i && (i.textContent = e);
    }
    (t === "status" || t.startsWith("bg") || t.startsWith("text")) && this.render(), this.applyStyles();
  }
  disable() {
    super.disable(), this.style.color = "gray";
  }
}
customElements.define("mci-badge", z);
class T extends r {
  constructor() {
    super(), this.timeout = null;
  }
  static get observedAttributes() {
    return [...r.observedAttributes, "value", "dismissible", "auto-close", "width", "height", "padding"];
  }
  _applyStylesFromAttributes() {
    if (this.hasAttribute("width")) {
      let t = this.getAttribute("width");
      this.style.width = t;
    }
    if (this.hasAttribute("height")) {
      let t = this.getAttribute("height");
      this.style.height = t;
    }
    if (this.hasAttribute("padding")) {
      let t = this.getAttribute("padding");
      this.style.padding = t;
    }
  }
  startAutoClose() {
    this.timeout && clearTimeout(this.timeout);
    const t = this.getAttribute("auto-close");
    let e = 3e3;
    t && !isNaN(parseInt(t)) && (e = parseInt(t)), this.timeout = setTimeout(() => {
      this.classList.add("hide"), setTimeout(() => {
        this.remove();
      }, 600);
    }, e);
  }
  connectedCallback() {
    this.render(), this.show(), this.hasAttribute("auto-close") && this.startAutoClose();
  }
  render() {
    const t = this.getStatusColor() || "#373737", e = this.hasAttribute("dismissible"), i = this.hasAttribute("auto-close"), o = e ? '<button class="close-btn">&times;</button>' : "";
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
                    background: var(--alert-bg, ${t}) !important;
                    color: var(--alert-text, #fff);
                    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
                    ${this.getPositionStyle()}
                    opacity: 1;
                    transform: translateY(0);
                    ${i ? "transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;" : ""}
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
            ${o}
        `, e && this.shadow.querySelector(".close-btn").addEventListener("click", () => this.hide());
  }
  getPositionStyle() {
    const t = this.getAttribute("set-position") || "top left", e = this.getPositionStyles(t);
    return Object.entries(e).map(([i, o]) => `${i}: ${o};`).join(" ");
  }
  onAttributeChange(t, e) {
    if (t === "value") {
      const i = this.shadow.querySelector("span");
      i && (i.textContent = e);
    }
    ["dismissible", "auto-close"].includes(t) && this.render(), t === "auto-close" && this.startAutoClose(), this._applyStylesFromAttributes();
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
customElements.define("mci-alert", T);
class L extends r {
  constructor() {
    super(), this.checked = this.hasAttribute("checked");
  }
  static get observedAttributes() {
    return [...r.observedAttributes, "checked", "disabled", "size", "on-label", "off-label", "label-msg", "bg-color", "text-color", "switch-label-color", "set-position"];
  }
  connectedCallback() {
    this.render();
  }
  getStatusColor() {
    const t = this.getAttribute("status") || "secondary";
    return {
      primary: "#007bff",
      secondary: "#373737",
      success: "#28a745",
      danger: "#dc3545",
      warning: "#ffc107",
      info: "#17a2b8",
      light: "#f8f9fa",
      dark: "#343a40"
    }[t] || "#373737";
  }
  render() {
    const t = this.getAttribute("size") || "medium", e = this.getAttribute("on-label") || "ON", i = this.getAttribute("off-label") || "OFF", o = this.hasAttribute("disabled"), n = this.getAttribute("label-msg") || "on";
    let c = this.getAttribute("bg-color");
    c || (c = this.getStatusColor() || "#373737");
    const d = "#ccc", l = this.getAttribute("text-color") || "#666", a = this.getAttribute("switch-label-color") || "#fff", u = this.getAttribute("set-position") || "static";
    this.checked = this.hasAttribute("checked");
    const p = {
      small: { width: "40px", height: "20px", sliderSize: "14px", moveX: "18px", fontSize: "10px" },
      medium: { width: "60px", height: "34px", sliderSize: "26px", moveX: "26px", fontSize: "12px" },
      large: { width: "80px", height: "44px", sliderSize: "34px", moveX: "36px", fontSize: "14px" }
    }, { width: m, height: b, sliderSize: g, moveX: y, fontSize: f } = p[t] || p.medium;
    this.shadow.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                    cursor: ${o ? "not-allowed" : "pointer"};
                    user-select: none;
                    position: ${u};
                }

                .switch {
                    position: relative;
                    display: inline-block;
                    width: ${m};
                    height: ${b};
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
                    background-color: ${this.checked ? c : d};
                    transition: .4s;
                    border-radius: ${b};
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: ${g};
                    width: ${g};
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                    transform: ${this.checked ? `translateX(${y})` : "translateX(0)"};
                }

                .switch-label {
                    font-size: ${f};
                    margin-left: 10px;
                    font-weight: bold;
                    color: ${l};
                    text-transform: uppercase;
                    display: ${n === "on" ? "inline" : "none"};
                }

                .switch-label-on {
                    color: ${a};
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
            <span class="switch-label switch-label-on">${this.checked ? e : i}</span>
        `, this.inputElement = this.shadow.querySelector("input"), this.labelElement = this.shadow.querySelector(".switch-label"), this.sliderElement = this.shadow.querySelector(".slider"), this.inputElement.addEventListener("change", () => this.handleToggle());
  }
  handleToggle() {
    this.checked = this.inputElement.checked;
    let t = this.getAttribute("bg-color");
    t || (t = this.getStatusColor() || "#373737"), this.checked ? (this.setAttribute("checked", ""), this.sliderElement.style.backgroundColor = t) : (this.removeAttribute("checked"), this.sliderElement.style.backgroundColor = "#ccc"), this.labelElement && (this.labelElement.textContent = this.checked ? this.getAttribute("on-label") || "ON" : this.getAttribute("off-label") || "OFF"), this.dispatchEvent(new CustomEvent("toggle", { detail: { checked: this.checked } }));
  }
  onAttributeChange(t, e) {
    ["checked", "disabled", "size", "on-label", "off-label", "label-msg", "bg-color", "text-color", "switch-label-color", "set-position"].includes(t) && (this.checked = this.hasAttribute("checked"), this.inputElement && (this.inputElement.checked = this.checked), this.render());
  }
  toggle() {
    this.checked = !this.checked, this.checked ? this.setAttribute("checked", "") : this.removeAttribute("checked");
  }
}
customElements.define("mci-toggle", L);
class M extends r {
  constructor() {
    super(), this.targetInput = null;
  }
  static get observedAttributes() {
    return [...r.observedAttributes, "text-size", "text-color"];
  }
  _applyStylesFromAttributes() {
    if (this.hasAttribute("text-size")) {
      let t = this.getAttribute("text-size");
      this.style.fontSize = t;
    }
    if (this.hasAttribute("text-color")) {
      let t = this.getAttribute("text-color");
      this.style.color = t;
    }
  }
  connectedCallback() {
    this.render(), this.observeForTarget();
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
            <span>${this.getAttribute("value") || "Enter your input"}</span> 
        `;
  }
  onAttributeChange(t, e, i) {
    if (t === "value") {
      const o = this.shadowRoot.querySelector("span");
      o && (o.textContent = i || "Enter your input");
    }
    this._applyStylesFromAttributes();
  }
  observeForTarget() {
    const t = this.getAttribute("for");
    if (!t) return;
    const e = () => {
      this.targetInput = document.getElementById(t), this.targetInput && (this.positionHelpText(), i.disconnect());
    };
    e();
    const i = new MutationObserver(e);
    i.observe(document.body, { childList: !0, subtree: !0 });
  }
}
customElements.define("mci-help-text", M);
class F extends r {
  constructor() {
    super(), this.render(), this.updateTime(), this.interval = setInterval(() => this.updateTime(), 1e3);
  }
  static get observedAttributes() {
    return ["value", "set-position", "disabled", "bg-color", "text-color", ...r.observedAttributes];
  }
  _updateAttributes() {
    if (this.hasAttribute("value")) {
      let t = this.getAttribute("value");
      this.timerTitle.textContent = t;
    }
  }
  _applystylesFromAttributes() {
    let t = this.getAttribute("bg-color");
    this.outerElement.style.backgroundColor = t;
    let e = this.getAttribute("text-color") || "#ffffff";
    this.timerTitle.style.color = e, this.timerDisplay.style.color = e;
  }
  onAttributeChange(t, e, i) {
    t === "value" && (this.timerTitle.textContent = i), t === "disabled" && this.toggleDisabledState(i !== null), this._updateAttributes(), this._applystylesFromAttributes(), this.applyStyles();
  }
  toggleDisabledState(t) {
    t ? (clearInterval(this.interval), this.timerDisplay.style.opacity = "0.5", this.timerDisplay.style.pointerEvents = "none") : (this.interval = setInterval(() => this.updateTime(), 1e3), this.timerDisplay.style.opacity = "1", this.timerDisplay.style.pointerEvents = "auto");
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
                    background: ${this.getAttribute("bg-color")};
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
        `, this.outerElement = this.shadowRoot.querySelector("div"), this.timerTitle = this.shadowRoot.querySelector("h3"), this.timerDisplay = this.shadowRoot.querySelector(".time"), this._applystylesFromAttributes();
  }
  updateTime() {
    if (this.hasAttribute("disabled")) return;
    const t = /* @__PURE__ */ new Date(), e = String(t.getHours()).padStart(2, "0"), i = String(t.getMinutes()).padStart(2, "0"), o = String(t.getSeconds()).padStart(2, "0");
    this.timerDisplay.textContent = `${e}:${i}:${o}`;
  }
}
customElements.define("mci-clock", F);
class _ extends r {
  constructor() {
    super(), this.render();
  }
  static get observedAttributes() {
    return ["max", "rating", "width", "height"];
  }
  onAttributeChange(t, e, i) {
    ["rating", "max", "star-color", "width", "height"].includes(t) && this._updateStars();
  }
  _updateStars() {
    const t = parseInt(this.getAttribute("max") || "5"), e = parseFloat(this.getAttribute("rating") || "0"), i = this.getAttribute("star-color") || "#FFD700", o = "lightgray";
    this.container.innerHTML = "";
    let n = Math.floor(e), c = e % 1 >= 0.5 ? 1 : 0, d = t - n - c;
    for (let l = 0; l < n; l++) {
      const a = document.createElement("span");
      a.style.backgroundColor = i, this.container.appendChild(a);
    }
    if (c) {
      const l = document.createElement("span");
      l.style.background = `linear-gradient(to right, ${i} 50%, ${o} 50%)`, this.container.appendChild(l);
    }
    for (let l = 0; l < d; l++) {
      const a = document.createElement("span");
      a.style.backgroundColor = o, this.container.appendChild(a);
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
        `, this.container = this.shadowRoot.querySelector("div"), this._updateStars();
  }
}
customElements.define("mci-rating", _);
class R extends r {
  constructor() {
    super(), this.targetElement = null;
  }
  static get observedAttributes() {
    return [...r.observedAttributes, "value", "tooltip-direction", "text-size", "text-color", "bg-color", "border-radius", "padding", "for"];
  }
  _applyStylesFromAttributes() {
    this.hasAttribute("width") && (this.style.width = this.getAttribute("width")), this.hasAttribute("height") && (this.style.height = this.getAttribute("height")), this.hasAttribute("padding") && (this.style.padding = this.getAttribute("padding")), this.hasAttribute("text-size") && (this.style.fontSize = this.getAttribute("text-size")), this.hasAttribute("text-color") && (this.style.color = this.getAttribute("text-color")), this.hasAttribute("bg-color") && (this.style.backgroundColor = this.getAttribute("bg-color")), this.hasAttribute("border-radius") && (this.style.borderRadius = this.getAttribute("border-radius"));
  }
  connectedCallback() {
    this.render(), this.attachEventListeners();
  }
  render() {
    const e = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? "absolute" : "fixed";
    this.shadow.innerHTML = `
            <style>
                :host {
                    position: ${e};
                    display: none;
                    background: var(--tooltip-bg, ${this.getAttribute("bg-color") || "#373737"});
                    color: var(--tooltip-text, ${this.getAttribute("text-color") || "white"});
                    padding: ${this.getAttribute("padding") || "5px 10px"};
                    border-radius: ${this.getAttribute("border-radius") || "4px"};
                    font-size: ${this.getAttribute("text-size") || "12px"};
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
        `, this.textElement = this.shadow.querySelector(".tooltip-text"), this.arrowElement = this.shadow.querySelector(".tooltip-arrow");
  }
  attachEventListeners() {
    const t = this.getAttribute("for");
    this.targetElement = document.getElementById(t), this.targetElement && (this.targetElement.addEventListener("mouseenter", () => this.showTooltip()), this.targetElement.addEventListener("mouseleave", () => this.hideTooltip()));
  }
  showTooltip() {
    this.updatePosition(), this.style.display = "block", setTimeout(() => {
      this.style.opacity = "1";
    }, 10);
  }
  hideTooltip() {
    this.style.opacity = "0", setTimeout(() => {
      this.style.display = "none";
    }, 300);
  }
  updatePosition() {
    if (!this.targetElement) return;
    const t = this.targetElement.getBoundingClientRect(), e = this.getAttribute("tooltip-direction") || "top";
    this.style.visibility = "hidden", this.style.display = "block";
    const i = this.getBoundingClientRect();
    this.style.visibility = "visible";
    let o, n;
    switch (e) {
      case "top":
        o = t.top - i.height - 8 + window.scrollY, n = t.left + t.width / 2 - i.width / 2 + window.scrollX;
        break;
      case "bottom":
        o = t.bottom + 8 + window.scrollY, n = t.left + t.width / 2 - i.width / 2 + window.scrollX;
        break;
      case "left":
        o = t.top + t.height / 2 - i.height / 2 + window.scrollY, n = t.left - i.width - 8 + window.scrollX;
        break;
      case "right":
        o = t.top + t.height / 2 - i.height / 2 + window.scrollY, n = t.right + 8 + window.scrollX;
        break;
    }
    Object.assign(this.style, {
      top: `${o}px`,
      left: `${n}px`,
      opacity: "1"
    });
  }
  onAttributeChange(t, e) {
    t === "value" && this.textElement && (this.textElement.textContent = e || "Tooltip"), t === "tooltip-direction" && this.updatePosition(), this._applyStylesFromAttributes();
  }
  disable() {
    super.disable(), this.style.color = "gray";
  }
  enable() {
    super.enable(), this.style.color = this.getAttribute("text-color") || "black";
  }
}
customElements.define("mci-tool-tip", R);
class B extends r {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return [...r.observedAttributes, "variant", "text", "hover-effect", "transition", "disabled"];
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const t = this.getAttribute("text") || "Click Me", e = this.getAttribute("variant") || "normal", i = this.getAttribute("padding") || "10px 20px", o = this.getAttribute("border-radius") || "5px", n = this.getAttribute("transition") || "0.3s", c = this.getAttribute("hover-effect") || "none", d = this.getAttribute("bg-color") || this.getStatusColor(), l = this.getAttribute("text-color") || "#fff";
    let a = `
            padding: ${i};
            border-radius: ${o};
            cursor: pointer;
            transition: all ${n} ease-in-out;
            font-size: var(--text-size, 16px);
            border: none;
            outline: none;
        `, u = "";
    c.includes("scale") && (u += "transform: scale(1.05);"), c.includes("shadow") && (u += "box-shadow: 0px 4px 8px rgba(1, 0, 0, 1);"), e === "outline" ? (a += `
                background: transparent !important;
                border: 2px solid ${d} !important;
                color: ${d} !important;
            `, u += `background: ${d} !important; color: #fff !important;`) : e === "disable" ? a += `
                background: #ccc !important;
                color: #666 !important;
                cursor: not-allowed !important;
                pointer-events: none !important;
            ` : a += `background: ${d} !important; color: ${l} !important;`, this.shadow.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                }
                button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    ${a}
                }
                button:hover {
                    ${u}
                }
                button:focus,
                button:active {
                    outline: none;
                    box-shadow: none;
                }
            </style>
            <button>${t}</button>
        `;
  }
  onAttributeChange(t) {
    ["status", "variant", "hover-effect", "disabled"].includes(t) && this.render();
  }
}
customElements.define("mci-button", B);
class q extends r {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return [
      ...r.observedAttributes,
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
    this.inputElement && (this.inputElement.style.backgroundColor = this.getAttribute("bg-color") || "#373737", this.inputElement.style.color = this.getAttribute("text-color") || "white", this.inputElement.style.width = this.getAttribute("width") || "auto", this.inputElement.style.fontSize = this.getAttribute("text-size") || "16px", this.inputElement.style.borderRadius = this.getAttribute("border-radius") || "0px", this.inputElement.style.border = "none");
  }
  connectedCallback() {
    this.render(), this.inputElement = this.shadow.querySelector("input"), this.iconElement = this.shadow.querySelector(".icon-box"), this.checkIcon = this.shadow.querySelector(".icon-check"), this.crossIcon = this.shadow.querySelector(".icon-cross"), this.addEventListeners(), this.inputElement.value = this.getAttribute("value") || "", this._applyStylesFromAttributes();
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
  onAttributeChange(t, e) {
    super.onAttributeChange(t, e), t === "value" && this.inputElement && (this.inputElement.value = e, this.validateEmail()), t === "disabled" && (this.inputElement.disabled = e !== null), this._applyStylesFromAttributes();
  }
  addEventListeners() {
    this.inputElement.addEventListener("input", () => {
      this.setAttribute("value", this.inputElement.value), this.validateEmail();
    });
  }
  validateEmail() {
    if (!(this.getAttribute("valid-ui") !== "false")) {
      this.iconElement.style.visibility = "hidden";
      return;
    }
    const e = this.inputElement.value.trim(), i = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), o = /[A-Z]/.test(e);
    if (!e) {
      this.hideIcons();
      return;
    }
    if (!i || o) {
      this.showInvalid();
      return;
    }
    this.showValid();
  }
  showValid() {
    this.iconElement.classList.remove("invalid"), this.iconElement.classList.add("valid"), this.iconElement.style.visibility = "visible", this.checkIcon.style.display = "block", this.crossIcon.style.display = "none";
  }
  showInvalid() {
    this.iconElement.classList.remove("valid"), this.iconElement.classList.add("invalid"), this.iconElement.style.visibility = "visible", this.checkIcon.style.display = "none", this.crossIcon.style.display = "block";
  }
  hideIcons() {
    this.iconElement.classList.remove("valid", "invalid"), this.iconElement.style.visibility = "hidden", this.checkIcon.style.display = "none", this.crossIcon.style.display = "none";
  }
}
customElements.define("mci-email-box", q);
class H extends r {
  constructor() {
    super(), this.inputElement = null, this.toggleIcon = null, this.errorMessage = null, this.getEyeIcon = this.getEyeIcon.bind(this), this.getEyeSlashIcon = this.getEyeSlashIcon.bind(this);
  }
  static get observedAttributes() {
    return [
      ...r.observedAttributes,
      "padding",
      "placeholder",
      "value",
      "disabled",
      "icon-ui",
      "text-color",
      "text-size",
      "border-radius",
      "bg-color",
      "border",
      "characters",
      "number",
      "symbol",
      "uppercase",
      "min-length",
      "max-length",
      "disabled",
      "width"
    ];
  }
  _applyStylesFromAttributes() {
    if (this.inputElement && (this.inputElement.style.backgroundColor = this.getAttribute("bg-color") || "#373737", this.inputElement.style.color = this.getAttribute("text-color") || "white", this.inputElement.style.width = this.getAttribute("width") || "auto", this.inputElement.style.fontSize = this.getAttribute("text-size") || "16px", this.inputElement.style.borderRadius = this.getAttribute("border-radius") || "0px", this.inputElement.style.border = "none", this.toggleIcon)) {
      const t = this.getAttribute("bg-color") || "black";
      this.toggleIcon.style.color = t.toLowerCase() === "black" ? "white" : "black";
    }
  }
  connectedCallback() {
    this.shadowRoot && (this.render(), this.cacheElements(), this.applyBaseStyles(), this.addEventListeners(), this.updateIconVisibility());
  }
  attributeChangedCallback(t, e, i) {
    super.attributeChangedCallback(t, e, i), t === "icon-ui" && this.updateIconVisibility(), e !== i && this.applyBaseStyles(), t === "disabled" && (this.inputElement.disabled = i !== null);
  }
  updateIconVisibility() {
    if (this.toggleIcon) {
      const t = this.getAttribute("icon-ui") !== "false";
      this.toggleIcon.style.display = t ? "flex" : "none";
    }
  }
  cacheElements() {
    this.inputElement = this.shadowRoot.querySelector("input"), this.toggleIcon = this.shadowRoot.querySelector(".toggle-icon"), this.errorMessage = this.shadowRoot.querySelector(".error-message"), (!this.inputElement || !this.toggleIcon || !this.errorMessage) && console.error("MCIPasswordBox: Elements not found. Check rendering.");
  }
  applyBaseStyles() {
    if (typeof this._applyStylesFromAttributes == "function" && this._applyStylesFromAttributes(), this.errorMessage) {
      const t = this.getAttribute("width") || "200px";
      this.errorMessage.style.maxWidth = t;
    }
  }
  addEventListeners() {
    !this.toggleIcon || !this.inputElement || (this.toggleIcon.addEventListener("click", () => {
      this.inputElement.type === "password" ? (this.inputElement.type = "text", this.toggleIcon.innerHTML = this.getEyeIcon()) : (this.inputElement.type = "password", this.toggleIcon.innerHTML = this.getEyeSlashIcon());
    }), this.inputElement.addEventListener("input", () => this.validateInput()));
  }
  validateInput() {
    if (!this.inputElement || !this.errorMessage) return;
    const t = this.inputElement.value;
    let e = [];
    this.hasAttribute("min-length") && t.length < parseInt(this.getAttribute("min-length")) && e.push(`Minimum length is ${this.getAttribute("min-length")} characters.`), this.hasAttribute("max-length") && t.length > parseInt(this.getAttribute("max-length")) && e.push(`Maximum length is ${this.getAttribute("max-length")} characters.`), this.hasAttribute("characters") && t.length !== parseInt(this.getAttribute("characters")) && e.push(`Password must be exactly ${this.getAttribute("characters")} characters.`), this.hasAttribute("number") && (t.match(/[0-9]/g) || []).length !== parseInt(this.getAttribute("number")) && e.push(`Password must contain exactly ${this.getAttribute("number")} numeric characters.`), this.hasAttribute("symbol") && (t.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length !== parseInt(this.getAttribute("symbol")) && e.push(`Password must contain exactly ${this.getAttribute("symbol")} special characters.`), this.hasAttribute("uppercase") && (t.match(/[A-Z]/g) || []).length !== parseInt(this.getAttribute("uppercase")) && e.push(`Password must contain exactly ${this.getAttribute("uppercase")} uppercase letters.`), this.errorMessage.textContent = e.length ? e.join(" ") : "";
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
        `, this.updateIconVisibility();
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
customElements.define("mci-password-box", H);
