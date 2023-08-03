import moment from 'moment';

export const convertDateTime = (date: string) => {
  return moment(date).format('LT');
};

export const convertDateTimeByDay = (date: string) => {
  return moment(date).format('L');
};

export const delay = (time: number) => {
  return new Promise((resolveInner) => {
    setTimeout(resolveInner, time);
  });
};

export const repeatElement = (element: JSX.Element, length: number) => {
  return Array.from({ length: length }, () => element);
};
