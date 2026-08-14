# ZeroSOC.org — Official Community Website

This repository houses the source code for [ZeroSOC.org](https://zerosoc.org), the official community portal for the **ZeroSOC Framework** and its open ecosystem.

## Overview

ZeroSOC.org is designed with a **Light Blueprint Glass Box** aesthetic, serving as an open, vendor-neutral hub to foster community collaboration around Autonomous SecOps.

### Key Principles
- **No Commercial Footprint:** 100% focused on open specifications and community collaboration.
- **Community Working Draft:** Positioned as an open draft (v0.x) inviting peer review and practitioner contribution.
- **No Documentation Duplication:** Links directly to canonical Markdown files in the `ZeroSOC` GitHub repositories (`zerosoc-framework`, `zerosoc-platform`, `zerosoc-cyber-range`, `zerosoc-mcp`).
- **Zero Build-Step Dependencies:** Pure modular HTML5, CSS3 custom properties, vanilla JavaScript, and SVG assets.

## Directory Structure

```
zerosoc.org/
├── index.html                   # Main landing page
├── css/
│   ├── tokens.css               # Light blueprint design tokens (colors, typography, grid)
│   ├── layout.css               # Grid systems, responsive frames, typography base
│   └── components.css           # Glass cards, HUD header, pipeline diagram, FAQ accordion
├── js/
│   ├── pipeline-explorer.js     # Interactive state switcher for Lifecycle Phases & G1-G5 Gates
│   └── main.js                  # Navigation scrolling, mobile menu, FAQ accordion logic
├── assets/
│   ├── zerosoc_logo.png         # Official ZeroSOC brand logo
│   ├── favicon.svg              # Vector SVG favicon
│   ├── favicon.png              # PNG favicon (64x64)
│   └── favicon.ico              # ICO fallback favicon
└── README.md                    # This document
```

## Local Preview

You can preview the website locally using any static web server. For example:

### Using Python 3
```bash
cd zerosoc.org
python3 -m http.server 8080
```
Open `http://localhost:8080` in your browser.

### Using Node / npx
```bash
cd zerosoc.org
npx serve .
```

## Deployment to GitHub Pages

This site is designed to deploy directly to GitHub Pages from the repository root:

1. Push this repository to `github.com/ZeroSOC/zerosoc.org`.
2. In GitHub repository settings, navigate to **Pages** (`Settings > Pages`).
3. Under **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` / `/(root)`
4. Save. GitHub Pages will build and deploy the site automatically.

## License

The code and design of ZeroSOC.org are licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
Documentation content is licensed under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).
