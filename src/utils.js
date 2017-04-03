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
  '#dcedc8',
  '#a9dacc',
  '#75c6d1',
  '#42b3d5',
  '#3993c2',
  '#27539b',
  '#1e3388',
  '#171e6d',
  '#aa0000'
];

// Получает дату в формате YYYY.MM.DD, возвращает объект типа Date.
// Необходимо для устранения различий парсинга в Chrome и Safari/Firefox.
export const newDate = data => {
  const parts = data.split('.');
  const date = new Date(parts[0], parts[1] - 1, parts[2]);

  return date;
}

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
