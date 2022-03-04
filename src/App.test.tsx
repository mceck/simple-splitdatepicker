import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const setup = () => {
  render(<App />);
  const daySelect: HTMLSelectElement = screen.getByTestId('day-select');
  const monthSelect: HTMLSelectElement = screen.getByTestId('month-select');
  const yearSelect: HTMLSelectElement = screen.getByTestId('year-select');
  const result = screen.getByTestId('date-result');
  return { daySelect, monthSelect, yearSelect, result };
};

test('render a date', () => {
  const { daySelect, monthSelect, yearSelect, result } = setup();
  fireEvent.change(daySelect, { target: { value: '1' } });
  expect(result.textContent).toBe('');
  fireEvent.change(monthSelect, { target: { value: '0' } });
  expect(result.textContent).toBe('');
  fireEvent.change(yearSelect, { target: { value: '2020' } });
  expect(result.textContent).toBe('01/01/2020');
});
