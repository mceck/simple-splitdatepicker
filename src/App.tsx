import moment from 'moment';
import React, { useState } from 'react';
import { DatePicker } from './DatePicker';

function App() {
  const [date, setDate] = useState<moment.Moment | undefined>();
  return (
    <div>
      <DatePicker initialDate={date} onChange={(newDate) => setDate(newDate)} />
      <div data-testid="date-result">{date?.format('DD/MM/YYYY')}</div>
    </div>
  );
}

export default App;
