import { useState } from 'react'

function App() {
  const [wage, setWage] = useState('')
  const [price, setPrice] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState(5)

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
          {/* Header */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight mb-2">
              Time is<br />Money.
            </h1>
            <p className="text-gray-500 font-medium">คำนวณเวลาที่คุณต้องจ่าย เพื่อแลกกับสิ่งที่คุณต้องการ</p>
          </header>

          {/* Form */}
          <main className="space-y-10">
            {/* Wage Input */}
            <div className="flex flex-col sm:flex-row sm:items-baseline border-b-2 border-black pb-3 group transition-colors focus-within:border-gray-500">
              <label htmlFor="wage" className="w-full sm:w-1/3 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-0 transition-colors group-focus-within:text-black">
                ค่าแรงต่อวัน
              </label>
              <div className="w-full sm:w-2/3 relative flex items-center">
                <input 
                  id="wage"
                  type="number" 
                  min="0"
                  placeholder="400" 
                  value={wage}
                  onChange={(e) => setWage(e.target.value)}
                  className="w-full bg-transparent text-3xl sm:text-4xl font-bold focus:outline-none placeholder-gray-200" 
                />
                <span className="text-gray-400 font-medium text-lg ml-2">THB/DAY</span>
              </div>
            </div>

            {/* Price Input */}
            <div className="flex flex-col sm:flex-row sm:items-baseline border-b-2 border-black pb-3 group transition-colors focus-within:border-gray-500">
              <label htmlFor="price" className="w-full sm:w-1/3 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-0 transition-colors group-focus-within:text-black">
                ราคาสินค้า
              </label>
              <div className="w-full sm:w-2/3 relative flex items-center">
                <input 
                  id="price"
                  type="number" 
                  min="0"
                  placeholder="0" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-transparent text-3xl sm:text-4xl font-bold focus:outline-none placeholder-gray-200" 
                />
                <span className="text-gray-400 font-medium text-lg ml-2">THB</span>
              </div>
            </div>

            {/* Days Per Week Input */}
            <div className="flex flex-col sm:flex-row sm:items-center border-b-2 border-black pb-3 group transition-colors focus-within:border-gray-500">
              <label className="w-full sm:w-1/3 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-0 transition-colors group-focus-within:text-black">
                รูปแบบการทำงาน
              </label>
              <div className="w-full sm:w-2/3 flex gap-6">
                {[
                  { value: 5, label: '5 วัน', sub: 'จ–ศ' },
                  { value: 6, label: '6 วัน', sub: 'จ–ส' },
                  { value: 7, label: '7 วัน', sub: 'ทุกวัน' },
                ].map(opt => (
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
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">เวลาที่ต้องทำงาน</h2>
              
              <div className="space-y-4">
                {/* Hours Level */}
                <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                  {hours > 0 && (
                    <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter">
                      {hours} <span className="text-2xl sm:text-3xl text-gray-400 font-medium tracking-normal -ml-1">ชม.</span>
                    </span>
                  )}
                  {minutes > 0 && (
                    <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter">
                      {minutes} <span className="text-2xl sm:text-3xl text-gray-400 font-medium tracking-normal -ml-1">นาที</span>
                    </span>
                  )}
                  {hours === 0 && minutes === 0 && (
                    <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-gray-200">
                      0 <span className="text-2xl sm:text-3xl font-medium tracking-normal -ml-1">ชม.</span>
                    </span>
                  )}
                </div>

                {/* Days and Weeks Level */}
                {totalHours > 0 && (
                  <div className="flex flex-col gap-2 text-lg sm:text-xl font-medium text-gray-600 border-l-2 border-gray-200 pl-4 mt-2">
                    <div>
                      <span className="text-gray-400 mr-2">≈</span>
                      <span className="font-bold text-black">{dFull}</span> วัน 
                      {dHours > 0 && <span> <span className="text-gray-400 font-normal">และ</span> <span className="font-bold text-black">{dHours}</span> ชม.</span>}
                    </div>
                    <div>
                      <span className="text-gray-400 mr-2">≈</span>
                      <span className="font-bold text-black">{wFull}</span> สัปดาห์ 
                      {wDays > 0 && <span> <span className="text-gray-400 font-normal">และ</span> <span className="font-bold text-black">{wDays}</span> วัน</span>}
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-6 text-sm font-medium text-gray-500">
                * ตกชั่วโมงละ <span className="font-bold text-black">{hourlyRate.toLocaleString('th-TH', { maximumFractionDigits: 2 })}</span> บาท
              </p>
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
