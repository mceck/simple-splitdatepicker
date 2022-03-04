import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DatePicker } from './DatePicker';

const setup = () => {
  render(<DatePicker />);
  const daySelect: HTMLSelectElement = screen.getByTestId('day-select');
  const monthSelect: HTMLSelectElement = screen.getByTestId('month-select');
  const yearSelect: HTMLSelectElement = screen.getByTestId('year-select');
  return { daySelect, monthSelect, yearSelect };
};

test('select a date', () => {
  const { daySelect, monthSelect, yearSelect } = setup();
  fireEvent.change(daySelect, { target: { value: '1' } });
  fireEvent.change(monthSelect, { target: { value: '0' } });
  fireEvent.change(yearSelect, { target: { value: '2020' } });
  expect(daySelect.value).toBe('1');
  expect(monthSelect.value).toBe('0');
  expect(yearSelect.value).toBe('2020');
});

test('select day 31 then select february', () => {
  const { daySelect, monthSelect } = setup();
  fireEvent.change(daySelect, { target: { value: '31' } });
  expect(daySelect.value).toBe('31');
  fireEvent.change(monthSelect, { target: { value: '1' } });
  expect(daySelect.value).toBe('none');
});

test('select 29th februrary on leap year then change to non leap year', () => {
  const { daySelect, monthSelect, yearSelect } = setup();
  fireEvent.change(yearSelect, { target: { value: '2020' } });
  fireEvent.change(monthSelect, { target: { value: '1' } });
  fireEvent.change(daySelect, { target: { value: '29' } });
  expect(daySelect.value).toBe('29');
  fireEvent.change(yearSelect, { target: { value: '2021' } });
  expect(daySelect.value).toBe('none');
});
