export var StringConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'string')
    return value;

  return value.toString();
};

export var BooleanConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'boolean')
    return value;

  return value.toString().toLowerCase() == 'false' ? false : true;
};

export var NumberConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'number')
    return value;

  return Number(value.toString());
};
