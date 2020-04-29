import { parseISO, format } from 'date-fns';

const formattedDate = (date: string, type = 'dd/MM/yyyy'): string => {
  const parsedDate = parseISO(date);
  return format(parsedDate, type);
};

export default formattedDate;
