# ⏱ Time-to-Money Converter — Implementation Plan

> แปลงราคาสินค้าเป็นชั่วโมงทำงานจากค่าแรงขั้นต่ำ

---

## 🗂 Project Overview

| Item | Detail |
|------|--------|
| Stack | React, HTML, CSS (Tailwind CDN), JavaScript |
| Default Wage | 400 บาท/ชั่วโมง |
| Layout | Left: Form + Result / Right: Banner 2000×2500 |
| Footer | GitHub + Instagram (jolynestarchaser / SWAGEST DEV) |

---

## 📐 Architecture

```
App
├── LeftPanel
│   ├── Header (Logo + Title)
│   ├── WageInput         ← ค่าแรง (บาท/ชม)
│   ├── PriceInput        ← ราคาสินค้า (บาท)
│   ├── CalculateButton
│   └── ResultCard        ← แสดง X ชม Y นาที
├── RightPanel
│   └── Banner (2000×2500 ratio → auto scale)
└── Footer
    ├── GitHub link
    └── Instagram link
```

---

## ✅ Task List

### Phase 1 — Project Setup
- [x] กำหนด stack: React (CDN / Vite), Tailwind CSS
- [x] วางโครงสร้าง component
- [x] กำหนด color palette และ typography

### Phase 2 — Core Logic
- [ ] **T-01** สร้าง `useConverter` hook
  - รับ `wage` (default 400) และ `price`
  - คำนวณ `hours = price / wage`
  - แตก `hours` เป็น `h` + `m` (นาที)
  - return `{ hours, minutes, totalHours }`

- [ ] **T-02** สร้าง input validation
  - ห้ามค่าติดลบหรือเป็น 0
  - แสดง error message ใต้ input

- [ ] **T-03** ทำ real-time calculation (onChange)

### Phase 3 — UI Components

- [ ] **T-04** `<WageInput>` component
  - label ซ้าย + input ขวา
  - placeholder: "400"
  - unit badge: "บาท/ชม"

- [ ] **T-05** `<PriceInput>` component
  - label ซ้าย + input ขวา
  - unit badge: "บาท"

- [ ] **T-06** `<ResultCard>` component
  - แสดง: "X ชั่วโมง Y นาที"
  - แสดง decimal hours เล็ก ๆ ด้านล่าง
  - animate เมื่อ result เปลี่ยน

- [ ] **T-07** `<Banner>` component
  - aspect-ratio: 2000/2500 (4:5)
  - responsive width
  - ใส่ branding / illustration

- [ ] **T-08** `<Footer>` component
  - GitHub: `https://github.com/jolynestarchaser`
  - Instagram: `https://www.instagram.com/starchaser.dev/`
  - label: SWAGEST DEV

### Phase 4 — Polish & UX

- [ ] **T-09** Responsive layout
  - Desktop: Left + Right side by side
  - Mobile: Stack vertically, Banner ซ่อนหรือย่อ

- [ ] **T-10** Micro-animations
  - result number fade/slide เมื่อเปลี่ยนค่า
  - button hover effect

- [ ] **T-11** Copy-to-clipboard บน ResultCard (optional)

- [ ] **T-12** Reset button ล้างค่า

### Phase 5 — Final

- [ ] **T-13** Test edge cases (0, empty, string input)
- [ ] **T-14** Review design และ spacing
- [ ] **T-15** Deploy / export

---

## 🔢 Core Formula

```js
const hoursNeeded = price / wage;
const h = Math.floor(hoursNeeded);
const m = Math.round((hoursNeeded - h) * 60);

// Example: ราคา 450 บาท, ค่าแรง 400 บาท/ชม
// → 450 / 400 = 1.125 ชั่วโมง
// → 1 ชั่วโมง 8 นาที
```

---

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Primary Color | `#1a1a2e` (dark navy) |
| Accent | `#e94560` (red-pink) |
| Surface | `#16213e` |
| Text | `#eaeaea` |
| Border Radius | 12px |
| Font | Sarabun (TH support) + Space Grotesk |

---

## 📁 File Structure (Vite / Single File)

```
src/
├── App.jsx          ← main layout
├── components/
│   ├── WageInput.jsx
│   ├── PriceInput.jsx
│   ├── ResultCard.jsx
│   ├── Banner.jsx
│   └── Footer.jsx
├── hooks/
│   └── useConverter.js
└── index.css        ← Tailwind + custom vars
```

> หรือใช้ Single-file React artifact ก็ได้เลย

---

*Made with ❤️ by SWAGEST DEV — jolynestarchaser*
