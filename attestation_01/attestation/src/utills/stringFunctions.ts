import { STRFUNC_IN_SYMBOL, STRFUNC_LOCALE_RU } from '../constants/utills/stringFunctions';

export const makePostDateFromISO = (str: string, withIN = false): string => {
  const date: Date = new Date(Date.parse(str));

  return (
    date.toLocaleString(STRFUNC_LOCALE_RU, { day: 'numeric', month: 'long' })
  + (
    (date.getFullYear() < new Date().getFullYear())
      ? (` ${date.getFullYear()} ${withIN ? STRFUNC_IN_SYMBOL : ''} `)
      : ` ${withIN ? STRFUNC_IN_SYMBOL : ''} `
  ) + date.toLocaleString(STRFUNC_LOCALE_RU, { hour: '2-digit', minute: '2-digit' })
  );
};

export const makeDateOnlyFromISO = (str: string): string => {
  const date: Date = new Date(Date.parse(str));
  return date.toLocaleString(STRFUNC_LOCALE_RU, { day: 'numeric', month: 'long', year: 'numeric' });
};

export const makeDigitDateFromISO = (str: string): string => {
  const date: Date = new Date(Date.parse(str));
  return date.toLocaleString(STRFUNC_LOCALE_RU, { day: 'numeric', month: 'numeric', year: 'numeric' });
};
