# Radio Button — Work Schedule Feature Plan

> เพิ่ม feature: เลือกรูปแบบการทำงาน 5 / 6 / 7 วัน/สัปดาห์

---

## 🧠 Logic Design

### ตัวแปรที่เพิ่มมา

```js
const HOURS_PER_DAY = 8          // ค่าคงที่ ไม่เปลี่ยน
const daysPerWeek   = 5 | 6 | 7  // มาจาก radio ที่เลือก
```

### สูตรคำนวณ (ต่อจากเดิม)

```js
// เดิม (v1)
const totalHours = price / wage

// เพิ่มใหม่ (v2)
const totalDays  = totalHours / HOURS_PER_DAY
const totalWeeks = totalDays  / daysPerWeek
```

### แตก remainder แต่ละระดับ

```js
// ชั่วโมง
const h = Math.floor(totalHours)
const m = Math.round((totalHours - h) * 60)

// วัน
const dFull  = Math.floor(totalDays)
const dHours = Math.round((totalDays - dFull) * HOURS_PER_DAY * 10) / 10

// สัปดาห์
const wFull = Math.floor(totalWeeks)
const wDays = Math.round((totalWeeks - wFull) * daysPerWeek * 10) / 10
```

---

## 📊 ตารางผลลัพธ์ตัวอย่าง

> สินค้าราคา **3,200 บาท**, ค่าแรง **400 บาท/ชม**

| โหมด | ชั่วโมง | วัน | สัปดาห์ |
|------|---------|-----|---------|
| 5 วัน/สัปดาห์ | 8 ชม | 1 วัน | 0.2 สัปดาห์ |
| 6 วัน/สัปดาห์ | 8 ชม | 1 วัน | ~0.17 สัปดาห์ |
| 7 วัน/สัปดาห์ | 8 ชม | 1 วัน | ~0.14 สัปดาห์ |

> สินค้าราคา **25,000 บาท**, ค่าแรง **400 บาท/ชม**

| โหมด | ชั่วโมง | วัน | สัปดาห์ |
|------|---------|-----|---------|
| 5 วัน/สัปดาห์ | 62.5 ชม | 7 วัน + 6.5 ชม | 1 สัปดาห์ + 2.5 วัน |
| 6 วัน/สัปดาห์ | 62.5 ชม | 7 วัน + 6.5 ชม | 1 สัปดาห์ + 1.8 วัน |
| 7 วัน/สัปดาห์ | 62.5 ชม | 7 วัน + 6.5 ชม | 1 สัปดาห์ + 0.9 วัน |

---

## ⚙️ State ที่ต้องจัดการ

```js
// React state
const [wage, setWage]           = useState(400)
const [price, setPrice]         = useState('')
const [daysPerWeek, setDPW]     = useState(5)   // ← ใหม่
const [result, setResult]       = useState(null)
```

---

## 🧩 Component Changes

### `<ScheduleRadio>` — component ใหม่

```jsx
const scheduleOptions = [
  { value: 5, label: '5 วัน', sub: 'จ–ศ' },
  { value: 6, label: '6 วัน', sub: 'จ–ส' },
  { value: 7, label: '7 วัน', sub: 'ทุกวัน' },
]

<ScheduleRadio
  value={daysPerWeek}
  onChange={(v) => setDPW(v)}
/>
```

### `<ResultCard>` — เพิ่ม props

```jsx
// v1
<ResultCard hours={h} minutes={m} />

// v2
<ResultCard
  hours={h} minutes={m}
  days={dFull} dayHours={dHours}
  weeks={wFull} weekDays={wDays}
/>
```

### `useConverter` hook — เพิ่ม parameter

```js
// v1
function useConverter(wage, price)

// v2
function useConverter(wage, price, daysPerWeek)
// returns: { totalHours, h, m, totalDays, dFull, dHours, totalWeeks, wFull, wDays }
```

---

## 🔄 UX Behavior

| Action | Reaction |
|--------|----------|
| เปลี่ยน radio | คำนวณใหม่ทันที (ถ้ามี price อยู่แล้ว) |
| พิมพ์ price | คำนวณ real-time (onChange) |
| กด Enter | คำนวณ |
| กด Reset | กลับ default (wage=400, dpw=5, price='') |

---

## ✅ Task List

- [ ] **R-01** สร้าง `<ScheduleRadio>` component (3 options)
- [ ] **R-02** เพิ่ม `daysPerWeek` state ใน App / hook
- [ ] **R-03** อัพเดท `useConverter` ให้รับ `daysPerWeek`
- [ ] **R-04** คำนวณ `totalDays` และ `totalWeeks`
- [ ] **R-05** อัพเดท `<ResultCard>` แสดง 3 ระดับ
- [ ] **R-06** อัพเดท Banner stats (วัน/ปี, รายได้/ปี) ตาม radio
- [ ] **R-07** Test edge cases (ราคาต่ำกว่า 1 ชม / หลายสัปดาห์)

---

*SWAGEST DEV — jolynestarchaser*
