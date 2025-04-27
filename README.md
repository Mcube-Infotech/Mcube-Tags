<h1 align="center">
  🚀 Mcube-Tags — Custom HTML Tag Library
</h1>

<p align="center">
  <b>A sleek, powerful set of custom HTML elements to simplify your daily frontend workflows</b><br/>
  Built with ❤️ by <a href="https://github.com/Mcube-Infotech" target="_blank">Mcube Infotech</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/tag/Mcube-Infotech/Mcube-Tags?color=%23990&label=version&style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/Mcube-Infotech/Mcube-Tags?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/Mcube-Infotech/Mcube-Tags?style=for-the-badge" />
</p>

---

## ✨ Overview

**Mcube-Tags** is a curated collection of custom HTML tags (Web Components) built to eliminate repetitive JavaScript and CSS boilerplate — making UIs easier, faster, and more beautiful to build.

---

## 📦 Installation

### 🔗 CDN

Load the latest version via jsDelivr:

```html
<!-- Latest build (from main) -->
<script type="module" src="https://cdn.jsdelivr.net/gh/Mcube-Infotech/Mcube-Tags/dist/mcube-tags.es.js"></script>
```

```html
<!-- Specific version -->
<script type="module" src="https://cdn.jsdelivr.net/gh/Mcube-Infotech/Mcube-Tags@v1.0/dist/mcube-tags.es.js"></script>
```

---

## 🧩 Components Included

| Tag             | Description                      |
|-----------------|----------------------------------|
| `<mci-alert>`   | Displays alert banners/messages |
| `<mci-badge>`   | Adds stylish badge UI elements  |
| `<mci-button>`  | Custom buttons with extra logic |

🧠 All components are reusable, extendable, and follow native Web Component standards.

---

## 🚀 Quick Start

Once you’ve included the script, start using components in your HTML:

```html
<mci-alert type="warning" message="Heads up!"></mci-alert>

<mci-badge label="Beta" color="purple"></mci-badge>

<mci-button label="Submit" icon="send"></mci-button>
```

No frameworks required. Works everywhere modern HTML does.

---

## 🛠️ Developer Setup

```bash
# Clone the repo
git clone https://github.com/Mcube-Infotech/Mcube-Tags.git

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production bundle
npm run build
```

Output will be generated in the `dist/` folder.

---

## 📁 Project Structure

```
Mcube-Tags/
├── dist/            # Final CDN-build files
├── src/
│   ├── components/  # All custom elements
│   ├── utils/       # Shared logic & base elements
│   └── main.js      # Entry file for bundling
├── vite.config.js
└── package.json
```

---

## 📌 Roadmap

- [x] Base component setup
- [x] Alert, Badge, Button tags
- [ ] Theme system / CSS variables
- [ ] Form controls
- [ ] Tabs, Modals, Loaders, Toasts
- [ ] Docs page + Storybook
- [ ] Publish to npm

---

## 👨‍💻 Contributing

Pull requests are welcome! Please open an issue first to discuss what you’d like to change.

```bash
git checkout -b feature/my-new-tag
git commit -m "feat: add new tag"
git push origin feature/my-new-tag
```

---

## 📃 License

Licensed under the [MIT License](LICENSE).

---

<p align="center">
  <a align="center" href="https://www.buymeacoffee.com/mcubetags" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a><br>
  Made with 💡 and lots of ☕ by <a href="https://github.com/Mcube-Infotech" target="_blank">Mcube Infotech</a>
</p>
