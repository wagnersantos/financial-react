const empty = (value: string | number): boolean => {
  return value === undefined || value === null;
};

const formatValue = (value: string | number, curr = 'BRL'): string => {
  if (!empty(value)) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: curr,
    });
  }
  return '';
};

export default formatValue;
