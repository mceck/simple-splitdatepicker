import moment from 'moment';
import React, { useCallback, useState } from 'react';

interface IDatePickerParams {
  initialDate?: moment.Moment;
  onChange?: (newDate?: moment.Moment) => void;
}

interface IDateState {
  day: string;
  month: string;
  year: string;
}

const NONE = 'none';
const SELECTABLE_MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const selectableDays = (date: IDateState) => {
  const ret = [];
  const lastDay =
    parseDate(
      1,
      date.month,
      date.year === NONE ? moment().year : date.year
    )?.daysInMonth() || 31;
  for (let d = 1; d <= lastDay; d++) ret.push(d);
  return ret;
};

const selectableYears = (date: IDateState) => {
  const ret = [];
  const lastYear = moment().year();
  for (let y = lastYear; y >= 1900; y--) ret.push(y);
  return ret;
};

const parseDate = (day: any, month: any, year: any) => {
  if (day === NONE || month === NONE || year === NONE) {
    return undefined;
  }
  return moment().year(year).month(month).date(day).startOf('day');
};

export const DatePicker: React.FC<IDatePickerParams> = ({
  initialDate,
  onChange,
}) => {
  const [date, setDate] = useState<IDateState>({
    day: initialDate?.day()?.toString() || NONE,
    month: initialDate?.month()?.toString() || NONE,
    year: initialDate?.year()?.toString() || NONE,
  });

  const onDateChange = useCallback(
    (value, target) => {
      const newDate = { ...date };
      newDate[target] = value;
      if (!selectableDays(newDate).includes(parseInt(newDate.day))) {
        newDate.day = NONE;
      }
      setDate(newDate);
      if (onChange) {
        const outputDate = parseDate(newDate.day, newDate.month, newDate.year);
        onChange(outputDate);
      }
    },
    [date, onChange]
  );

  return (
    <div>
      <select
        value={date.day}
        onChange={(e) => onDateChange(e.target.value, 'day')}
        data-testid="day-select"
      >
        <option value={NONE}>Giorno</option>
        {selectableDays(date).map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <select
        value={date.month}
        onChange={(e) => onDateChange(e.target.value, 'month')}
        data-testid="month-select"
      >
        <option value={NONE}>Mese</option>
        {SELECTABLE_MONTHS.map((m) => (
          <option key={m} value={m}>
            {moment().set('month', m).format('MMMM')}
          </option>
        ))}
      </select>
      <select
        value={date.year}
        onChange={(e) => onDateChange(e.target.value, 'year')}
        data-testid="year-select"
      >
        <option value={NONE}>Anno</option>
        {selectableYears(date).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};
