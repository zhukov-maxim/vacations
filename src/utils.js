export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

export const COLORS = [
  'transparent',
  '#f8cdaa',
  '#f2aca1',
  '#ed8c97',
  '#e86c8e',
  '#da5389',
  '#b7458e',
  '#963993',
  '#732d99',
  '#5e258b'
];

// Возвращает порядковый номер дня в году:
// Не учитывает летнее время в некоторых странах.
// http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
export const dayOfYear = date => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - firstDayOfYear;
  const oneDay = 1000 * 60 * 60 * 24; // ms * s * m * h
  const dayNumber = Math.floor(diff / oneDay);

  return dayNumber;
}
