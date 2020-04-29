const empty = (value: number): boolean => {
  return value === undefined || value === null;
};

const formatValue = (value: number, curr: string): string => {
  if (!empty(value)) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: curr,
    });
  }
  return '';
};

export default formatValue;
