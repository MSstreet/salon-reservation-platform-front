import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarPickerProps {
  value: string;
  onChange: (date: string) => void;
}

const DAY_HEADERS = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarPicker({ value, onChange }: CalendarPickerProps) {
  const todayRaw = new Date();
  const today = new Date(todayRaw.getFullYear(), todayRaw.getMonth(), todayRaw.getDate());

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const toDateStr = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  type Cell = { day: number; month: number; year: number; current: boolean };
  const cells: Cell[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const m = viewMonth === 0 ? 11 : viewMonth - 1;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    cells.push({ day: daysInPrevMonth - i, month: m, year: y, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: viewMonth, year: viewYear, current: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = viewMonth === 11 ? 0 : viewMonth + 1;
    const y = viewMonth === 11 ? viewYear + 1 : viewYear;
    cells.push({ day: d, month: m, year: y, current: false });
  }

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-center gap-6 mb-6">
        <button type="button" onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xl font-bold">{viewYear}.{viewMonth + 1}</span>
        <button type="button" onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((d, i) => (
          <div key={d} className={`text-center text-sm font-medium py-2 ${i === 0 ? "text-red-500" : "text-gray-500"}`}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((cell, idx) => {
          const date = new Date(cell.year, cell.month, cell.day);
          const isPast = date < today;
          const isToday = date.getTime() === today.getTime();
          const isSelected = value === toDateStr(cell.year, cell.month, cell.day);
          const isSunday = idx % 7 === 0;
          const disabled = !cell.current || isPast;

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => onChange(toDateStr(cell.year, cell.month, cell.day))}
              className={[
                "flex flex-col items-center justify-center py-3 rounded-xl transition-all text-sm font-medium",
                !cell.current ? "opacity-25 cursor-default" : "",
                cell.current && isPast ? "text-gray-400 cursor-default" : "",
                cell.current && !isPast && !isToday && !isSelected
                  ? `${isSunday ? "text-red-500" : "text-gray-900"} hover:bg-gray-100 cursor-pointer`
                  : "",
                isSelected && !isToday ? "bg-gray-800 text-white cursor-pointer" : "",
                isToday ? "bg-green-500 text-white cursor-pointer hover:bg-green-600" : "",
              ].join(" ")}
            >
              <span>{cell.day}</span>
              {isToday && <span className="text-xs leading-none mt-0.5">오늘</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
