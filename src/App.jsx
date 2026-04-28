import { useState } from 'react'

const translations = {
  th: {
    subtitle: 'คำนวณเวลาที่คุณต้องจ่าย เพื่อแลกกับสิ่งที่คุณต้องการ',
    wageLabel: 'ค่าแรงต่อวัน',
    priceLabel: 'ราคาสินค้า',
    scheduleLabel: 'รูปแบบการทำงาน',
    days5: '5 วัน',
    days5sub: 'จ–ศ',
    days6: '6 วัน',
    days6sub: 'จ–ส',
    days7: '7 วัน',
    days7sub: 'ทุกวัน',
    resultTitle: 'เวลาที่ต้องทำงาน',
    tooRich: 'คุณรวยเกินจะมาใช้แอพอะไรแบบนี้อีกแล้ว 💸',
    tooRichSub: 'เอาเวลาไปใช้ชีวิตเถอะครับ!',
    invalidTitle: 'ตัวเลขสูงหรือผิดปกติเกินไป',
    invalidSub: 'กรุณาลดจำนวนลงให้อยู่ในขอบเขตที่คำนวณได้',
    hrs: 'ชม.',
    mins: 'นาที',
    dayUnit: 'วัน',
    and: 'และ',
    weekUnit: 'สัปดาห์',
    hourlyNote: '* ตกชั่วโมงละ',
    baht: 'บาท',
  },
  en: {
    subtitle: 'Calculate how much of your life you need to trade for what you want.',
    wageLabel: 'Daily Wage',
    priceLabel: 'Item Price',
    scheduleLabel: 'Work Schedule',
    days5: '5 Days',
    days5sub: 'Mon–Fri',
    days6: '6 Days',
    days6sub: 'Mon–Sat',
    days7: '7 Days',
    days7sub: 'Everyday',
    resultTitle: 'Time Required to Work',
    tooRich: "You're too rich to be using an app like this 💸",
    tooRichSub: 'Go enjoy your life!',
    invalidTitle: 'Number is too high or invalid',
    invalidSub: 'Please reduce the amount to a calculable range.',
    hrs: 'hrs',
    mins: 'min',
    dayUnit: 'days',
    and: 'and',
    weekUnit: 'weeks',
    hourlyNote: '* Hourly rate:',
    baht: 'THB',
  },
}

function App() {
  const [wage, setWage] = useState('')
  const [price, setPrice] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState(5)
  const [lang, setLang] = useState('th')

  const t = translations[lang]

  const HOURS_PER_DAY = 8;
  const actualWage = parseFloat(wage) || 400;
  const hourlyRate = actualWage / HOURS_PER_DAY;
  const totalHours = (parseFloat(price) || 0) / hourlyRate;

  let hours = Math.floor(totalHours);
  let minutes = Math.round((totalHours - hours) * 60);

  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }

  const totalDays = totalHours / HOURS_PER_DAY;
  const dFull = Math.floor(totalDays);
  const dHours = Math.round((totalDays - dFull) * HOURS_PER_DAY * 10) / 10;

  const totalWeeks = totalDays / daysPerWeek;
  const wFull = Math.floor(totalWeeks);
  const wDays = Math.round((totalWeeks - wFull) * daysPerWeek * 10) / 10;

  const isTooRich = wage.length > 7;
  const isInvalidResult = !isTooRich && price !== '' && (!Number.isFinite(totalHours) || totalHours > Number.MAX_SAFE_INTEGER);

  const locale = lang === 'th' ? 'th-TH' : 'en-US';

  const scheduleOptions = [
    { value: 5, label: t.days5, sub: t.days5sub },
    { value: 6, label: t.days6, sub: t.days6sub },
    { value: 7, label: t.days7, sub: t.days7sub },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-black font-sans selection:bg-black selection:text-white">

      {/* Right Panel (Banner) - Rendered on top in mobile via order-1 */}
      <div className="w-full h-[40vh] md:h-screen md:w-1/2 order-1 md:order-2 bg-gray-50 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <img
          src="/mybanner.png"
          alt="Starchaser Banner"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Left Panel (Content) - Rendered below banner in mobile via order-2 */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-24 order-2 md:order-1 min-h-[60vh] md:min-h-screen">

        <div>
          {/* Language Toggle + Header */}
          <header className="mb-16">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
                Time is<br />Money.
              </h1>
              <button
                onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
                className="flex-shrink-0 ml-4 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Toggle language"
              >
                {lang === 'th' ? 'EN' : 'TH'}
              </button>
            </div>
            <p className="text-gray-500 font-medium">{t.subtitle}</p>
          </header>

          {/* Form */}
          <main className="space-y-10">
            {/* Wage Input */}
            <div className="flex flex-col sm:flex-row sm:items-baseline border-b-2 border-black pb-3 group transition-colors focus-within:border-gray-500">
              <label htmlFor="wage" className="w-full sm:w-1/3 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-0 transition-colors group-focus-within:text-black">
                {t.wageLabel}
              </label>
              <div className="w-full sm:w-2/3 relative flex items-center">
                <input
                  id="wage"
                  type="number"
                  min="0"
                  max="99999999"
                  // 1. ดักไม่ให้พิมพ์อักขระพิเศษทางคณิตศาสตร์
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "*"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="400"
                  value={wage}
                  // 2. เช็คว่าถ้าค่าไม่เกิน max ถึงจะยอมให้เซ็ต state
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || Number(val) <= 99999999) {
                      setWage(val);
                    }
                  }}
                  className="w-full bg-transparent text-3xl sm:text-4xl font-bold focus:outline-none placeholder-gray-200"
                />
                <span className="text-gray-400 font-medium text-lg ml-2">THB/DAY</span>
              </div>
            </div>

            {/* Price Input */}
            <div className="flex flex-col sm:flex-row sm:items-baseline border-b-2 border-black pb-3 group transition-colors focus-within:border-gray-500">
              <label htmlFor="price" className="w-full sm:w-1/3 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-0 transition-colors group-focus-within:text-black">
                {t.priceLabel}
              </label>
              <div className="w-full sm:w-2/3 relative flex items-center">
                <input
                  id="price"
                  type="number"
                  min="0"
                  max="1000000000"
                  // 1. ดักอักขระพิเศษเช่นเดียวกัน
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "*"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="0"
                  value={price}
                  // 2. เช็คว่าถ้าค่าไม่เกิน max ถึงจะยอมให้เซ็ต state
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || Number(val) <= 1000000000) {
                      setPrice(val);
                    }
                  }}
                  className="w-full bg-transparent text-3xl sm:text-4xl font-bold focus:outline-none placeholder-gray-200"
                />
                <span className="text-gray-400 font-medium text-lg ml-2">THB</span>
              </div>
            </div>

            {/* Days Per Week Input */}
            <div className="flex flex-col sm:flex-row sm:items-center border-b-2 border-black pb-3 group transition-colors focus-within:border-gray-500">
              <label className="w-full sm:w-1/3 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-0 transition-colors group-focus-within:text-black">
                {t.scheduleLabel}
              </label>
              <div className="w-full sm:w-2/3 flex gap-6">
                {scheduleOptions.map(opt => (
                  <label key={opt.value} className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="daysPerWeek"
                      value={opt.value}
                      checked={daysPerWeek === opt.value}
                      onChange={() => setDaysPerWeek(opt.value)}
                      className="accent-black w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm sm:text-base leading-tight">{opt.label}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 font-medium">{opt.sub}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Result Area */}
            <div className="pt-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{t.resultTitle}</h2>

              {isTooRich ? (
                <div className="p-6 bg-black text-white rounded-xl border border-gray-800">
                  <p className="text-xl sm:text-2xl font-black leading-tight tracking-tight">{t.tooRich}</p>
                  <p className="text-sm sm:text-base mt-2 text-gray-400 font-medium">{t.tooRichSub}</p>
                </div>
              ) : isInvalidResult ? (
                <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-200">
                  <p className="text-lg font-bold">{t.invalidTitle}</p>
                  <p className="text-sm mt-1">{t.invalidSub}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {/* Hours Level */}
                    <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 break-words">
                      {hours > 0 && (
                        <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter break-all">
                          {hours.toLocaleString(locale)} <span className="text-2xl sm:text-3xl text-gray-400 font-medium tracking-normal -ml-1 inline-block">{t.hrs}</span>
                        </span>
                      )}
                      {minutes > 0 && (
                        <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter break-all">
                          {minutes.toLocaleString(locale)} <span className="text-2xl sm:text-3xl text-gray-400 font-medium tracking-normal -ml-1 inline-block">{t.mins}</span>
                        </span>
                      )}
                      {hours === 0 && minutes === 0 && (
                        <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-gray-200">
                          0 <span className="text-2xl sm:text-3xl font-medium tracking-normal -ml-1">{t.hrs}</span>
                        </span>
                      )}
                    </div>

                    {/* Days and Weeks Level */}
                    {totalHours > 0 && (
                      <div className="flex flex-col gap-2 text-lg sm:text-xl font-medium text-gray-600 border-l-2 border-gray-200 pl-4 mt-2 break-words">
                        <div>
                          <span className="text-gray-400 mr-2">≈</span>
                          <span className="font-bold text-black break-all">{dFull.toLocaleString(locale)}</span> {t.dayUnit}
                          {dHours > 0 && <span> <span className="text-gray-400 font-normal">{t.and}</span> <span className="font-bold text-black break-all">{dHours.toLocaleString(locale)}</span> {t.hrs}</span>}
                        </div>
                        <div>
                          <span className="text-gray-400 mr-2">≈</span>
                          <span className="font-bold text-black break-all">{wFull.toLocaleString(locale)}</span> {t.weekUnit}
                          {wDays > 0 && <span> <span className="text-gray-400 font-normal">{t.and}</span> <span className="font-bold text-black break-all">{wDays.toLocaleString(locale)}</span> {t.dayUnit}</span>}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="mt-6 text-sm font-medium text-gray-500 break-words">
                    {t.hourlyNote} <span className="font-bold text-black break-all">{hourlyRate.toLocaleString(locale, { maximumFractionDigits: 2 })}</span> {t.baht}
                  </p>
                </>
              )}
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-16 flex flex-wrap gap-8 text-xs sm:text-sm font-bold uppercase tracking-widest">
          <a
            href="https://github.com/jolynestarchaser"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all hover:after:w-full"
          >
            GitHub <span className="text-base font-normal">↗</span>
          </a>
          <a
            href="https://www.instagram.com/starchaser.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all hover:after:w-full"
          >
            Instagram <span className="text-base font-normal">↗</span>
          </a>
        </footer>

      </div>
    </div>
  )
}

export default App
